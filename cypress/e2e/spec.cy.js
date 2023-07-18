describe('FinancialData Table', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.contains('Financial Data Table').should('exist');
  });

  it('should sort "Ticker" in alphabetical order', () => {
    cy.get('th').contains('Ticker').click();
    cy.get('tbody tr:nth-child(1) td:nth-child(1)').should('have.text', 'ALPHA');
    cy.get('tbody tr:nth-child(1) td:nth-child(2)').should('have.text', 'Credit');
    cy.get('tbody tr:nth-child(1) td:nth-child(3)').should('have.text', '3150.67');
  });

  it('should sort "Asset Class" in the specified order as Equities first, then Macro and Credit last.', () => {
    cy.get('th').contains('Asset Class').click();
    cy.get('tbody tr:nth-child(1) td:nth-child(1)').should('have.text', 'BETA');
    cy.get('tbody tr:nth-child(1) td:nth-child(2)').should('have.text', 'Equities');
    cy.get('tbody tr:nth-child(1) td:nth-child(3)').should('have.text', '3791.37');
  });

  it('should sort "Price" in descending order', () => {
    cy.get('th').contains('Price').click();
    cy.get('tbody tr:nth-child(1) td:nth-child(1)').should('have.text', 'BETA');
    cy.get('tbody tr:nth-child(1) td:nth-child(2)').should('have.text', 'Equities');
    cy.get('tbody tr:nth-child(1) td:nth-child(3)').should('have.text', '3791.37');
  });

  it('should have "Macro" row with a white background', () => {
    cy.get('[data-testid^="asset-class-"]').contains('Macro').parent('.table-row').should('have.class', 'asset-macro');
  });

  it('should have "Equities" row with a blue background', () => {
    cy.get('[data-testid^="asset-class-"]').contains('Equities').parent('.table-row').should('have.class', 'asset-equities');
  });

  it('should have "Credit" row with a green background', () => {
    cy.get('[data-testid^="asset-class-"]').contains('Credit').parent('.table-row').should('have.class', 'asset-credit');
  });
});
