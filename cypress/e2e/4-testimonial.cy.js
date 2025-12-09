describe('Modul Testimonial User', () => {
  const uniqueId = Date.now();
  const user = {
    fullName: 'Reviewer Handal',
    email: `review${uniqueId}@test.com`,
    password: '#Password123'
  };

  // Setup: Buat akun baru
  before(() => {
    cy.request('POST', 'http://localhost:5000/api/auth/register', user).then((res) => {
      expect(res.status).to.eq(201);
    });
  });

  // Login
  beforeEach(() => {
    cy.intercept('POST', '/api/testimonials').as('postTestimonial');
    cy.intercept('GET', '/api/testimonials').as('getTestimonials');

    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('Harus berhasil mengirim testimonial dan tampil di halaman', () => {
    // 1. Scroll ke section testimonial
    cy.get('#testimonial').scrollIntoView();
    cy.contains('Leave a Review').should('be.visible');

    // 2. Isi Pesan
    const reviewMessage = 'Makanannya enak banget, diet jadi tidak menyiksa!';
    cy.get('textarea[name="message"]').type(reviewMessage);

    // 3. Beri Rating Bintang 5
    cy.get('form')
      .find('div.flex.gap-2 > div.relative')
      .last()
      .click();

    // 4. Submit
    cy.contains('button', 'Submit Review').click();

    // 5. Tunggu Backend
    cy.wait('@postTestimonial').its('response.statusCode').should('eq', 201);

    // --- PERBAIKAN DI SINI ---
    // 6. Validasi UI dengan Scope Spesifik
    
    cy.get('#testimonial').within(() => {
        // Cek pesan review
        cy.contains(reviewMessage).should('be.visible');
        
        // Cek nama pengirim
        cy.contains(user.fullName).should('be.visible'); 
    });
  });
});