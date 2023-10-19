describe('Ejercicio 2: Automatización de una web', () => {    

    it('performs automation on Google search', () => {
        // 1. Buscar en Google la palabra "automatización"
        cy.visit('https://www.google.com/');
        cy.get('#APjFqb').should('be.visible').type('automatización').type('{enter}');

        // 2. Buscar el link de la Wikipedia resultante
        cy.contains('Wikipedia').should('be.visible').click();
            
        // 3. Dar click en el link de wikipedia segun la busqueda
        cy.contains('Automatización - Wikipedia').should('be.visible').click({ force: true });
        cy.wait(100)
        cy.reload

        // 4. Comprobar que redirecciono a la pagina de wikipedia
        cy.url().should('eq', 'https://es.wikipedia.org/wiki/Automatizaci%C3%B3n');
        
        // 5. Comprobar existe el contenido buscado  
        cy.get('#bodyContent').invoke('text').then((bodyText) => {
            const palabraBuscada = 'año 270 a. C.';
            if (bodyText.includes(palabraBuscada)) {
            cy.log(`La palabra "${palabraBuscada}" fue encontrada en el contenido.`);
            } else {
            cy.log(`La palabra "${palabraBuscada}" no fue encontrada en el contenido.`);
            }
        });

        // 5. Realizar un screenshot de la página de Wikipedia
        cy.screenshot('wikipedia_page');

    });
});
