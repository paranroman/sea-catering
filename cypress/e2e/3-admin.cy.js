describe('Modul Admin Dashboard', () => {
  
  it('Harus menampilkan Admin Dashboard saat login sebagai Admin', () => {
    // 1. Login pakai akun Admin default
    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]').type('admin@seacatering.id');
    cy.get('input[name="password"]').type('#Admin123');
    
    // Klik login
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:5173/');

    // Verifikasi tambahan: Pastikan token sudah masuk local storage
    cy.window().then((window) => {
      expect(window.localStorage.getItem('token')).to.be.a('string');
    });

    cy.visit('http://localhost:5173/subscription');

    cy.contains('h2', 'Admin Dashboard').should('be.visible');

    // Pastikan kartu metrik muncul
    cy.contains('New Subscriptions').should('be.visible');
    cy.contains('MRR (Rp)').should('be.visible');
    
    // Pastikan ada input tanggal untuk filter
    cy.get('input[type="date"]').should('have.length', 2);
  });

});