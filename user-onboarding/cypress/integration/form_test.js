// [] Get the Name input and type a name in it.
// [] Use an assertion to check if the text inputted contains the name you provided (Hint: use the .should assertion)
// [] Get the Email input and type an email address in it
// [] Get the password input and type a password in it
// [] Set up a test that will check to see if a user can check the terms of service box
// [] Check to see if a user can submit the form data
// [] Check for form validation if an input is left empty]

describe('Form app:', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001');
    })
    const firstNameInput = () => cy.get( 'input[name=first_name]' );
    const emailInput = () => cy.get('input[name=email]');
    const lastNameInput = () => cy.get( 'input[name=last_name]' );
    const passwordInput = () => cy.get('input[name=password]');
    const submitButton = () => cy.get('button[id=submit');
    const tos = () => cy.get('input[name=tos]');

    it('Elements located in DOM', () => {
        firstNameInput().should('exist');
        lastNameInput().should('exist');
        emailInput().should('exist');
        passwordInput().should('exist');
        submitButton().should('exist');
        tos().should('exist');
    })

    it('submit button starts disabled', () => {
        submitButton().should('be.disabled');
      })
    it('type inputs', () => {
        firstNameInput()
            .should('have.value', '')
            .type('Joshua')
            .should('have.value', 'Joshua')

        lastNameInput()
            .should('have.value', '')
            .type('Ayerbudd')
            .should('have.value', 'Ayerbudd')
  
        emailInput()
            .should('have.value', '')
            .type('joshsadinsky@banana.edu')
            .should('have.value', 'joshsadinsky@banana.edu')
      
        passwordInput()
            .should('have.value', '')
            .type('imgettinghungry777')
            .should('have.value', 'imgettinghungry777')
    
        tos()
            .check()
    })
    it('invalid inputs', () => {
        firstNameInput().type('b')
        cy.contains("Your name isn't that short!")
        lastNameInput().type('b')
        cy.contains("Your name isn't that short!")
        emailInput().type('icantread')
        cy.contains('Enter valid address!')
        passwordInput().type('q')
        cy.contains('Choose a longer password!')
        submitButton().should('be.disabled')
    })
    it('incomplete inputs', () => {
        firstNameInput()
            .should('have.value', '')
            .type('Joshua')
            .should('have.value', 'Joshua')

        lastNameInput()
            .should('have.value', '')
            .type('Ayerbudd')
            .should('have.value', 'Ayerbudd')
  
        emailInput()
            .should('have.value', '')
            .type('joshsadinsky@banana.edu')
            .should('have.value', 'joshsadinsky@banana.edu')
      
        submitButton()
            .should('be.disabled')
    })
    it('Submission', () => {
        firstNameInput().type('Crabthief')
        lastNameInput().type('Nostradamus')
        emailInput().type('occultsecrets@protonmail.com')  
        passwordInput().type('kabbalahstudier75')
        tos().check()
        submitButton().click()
        cy.contains('Crabthief Nostradamus')
        cy.contains('occultsecrets@protonmail.com')
    })

})