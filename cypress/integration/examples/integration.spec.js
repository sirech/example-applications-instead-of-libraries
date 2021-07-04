context('Integrated Application', () => {
  beforeEach(() => {})

  it('shows the integrated remote component', () => {
    cy.visit('http://localhost:3001')

    cy.contains('Host Application').should('exist')
    cy.contains('The selected locale is de-DE').should('exist')
  })
})
