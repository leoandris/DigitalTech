
describe('Ejercicio 3: Tratamiento de datos en APIs', () => {

    // Prueba 1: Crear un usuario
    it('Crea un usuario', () => {
      const username = 'auto';
  
      // Paso 1: Utilizamos el nombre de usuario directamente en la solicitud POST
      cy.request('POST', 'https://petstore.swagger.io/v2/user', {
        id: 0,
        username: username,
        firstName: 'Automated',
        lastName: 'User',
        email: 'auto@example.com',
        password: '12345',
        phone: '1234567890',
        userStatus: 1,
      }).then((response) => {
        // Paso 2: Verificamos que la respuesta fue exitosa (código 200 OK)
        expect(response.status).to.equal(200);
  
        // Paso 3: Logueamos la creación exitosa del usuario con el nombre de usuario
        cy.log('Usuario creado exitosamente con el nombre de usuario:', username);
  
        // Paso 4: Utilizamos el nombre de usuario en la solicitud GET para recuperar datos del usuario
        cy.request('GET', `https://petstore.swagger.io/v2/user/${username}`).then((userResponse) => {
          const fetchedUserData = userResponse.body;
          // Paso 5: Logueamos los datos recuperados del usuario
          cy.log('Datos recuperados del usuario:', fetchedUserData);
        });
  
        // Paso 6: Espera un momento antes de realizar la siguiente solicitud
        cy.wait(1000);
      });
    });
  
    // Prueba 2: Crear un usuario y realizar operaciones adicionales
    it('Crea un usuario y realiza operaciones', () => {
      // Paso 1: Realizamos una solicitud GET para obtener las mascotas vendidas
      cy.request('GET', 'https://petstore.swagger.io/v2/pet/findByStatus?status=sold').then((petResponse) => {
        // Paso 2: Verificamos que la respuesta fue exitosa (código 200 OK)
        expect(petResponse.status).to.equal(200);
  
        const soldPetNames = petResponse.body.map(pet => ({ id: pet.id, name: pet.name }));
        // Paso 3: Logueamos los nombres de las mascotas vendidas
        cy.log('Nombres de mascotas vendidas:', soldPetNames);
  
        // Paso 4: Agregamos logs adicionales para mostrar los nombres de las mascotas individualmente
        soldPetNames.forEach(pet => {
          cy.log(`ID mascota: ${pet.id}, Nombre mascota: ${pet.name}`);
        });
  
        // Paso 5: Contamos las mascotas por nombre utilizando la función countPetsByName
        const petCounter = countPetsByName(soldPetNames);
        const petCountResult = petCounter.countPetsByName();
        // Paso 6: Logueamos el resultado del conteo de mascotas por nombre
        cy.log('Conteo de mascotas por nombre:', formatPetCountResult(petCountResult));
      });
    });
  });
  
  // Función para contar las mascotas con el mismo nombre
  function countPetsByName(petData) {
    const petCount = {};
  
    // Iteramos sobre los datos de las mascotas y contamos por nombre
    petData.forEach(pet => {
      const name = pet.name.trim();
      petCount[name] = (petCount[name] || 0) + 1;
    });
  
    return {
      countPetsByName: () => petCount,
    };
  }

  // Función para formatear el resultado del conteo de mascotas por nombre
  function formatPetCountResult(petCountResult) {
    // Convertimos el objeto a una cadena en el formato especificado
    const formattedResult = JSON.stringify(petCountResult);
    return formattedResult;
    }
  