describe('Modul Subscription User', () => {
  const uniqueId = Date.now();
  const userEmail = `user${uniqueId}@test.com`;
  const userPass = '#Password123';

  before(() => {
    cy.request('POST', 'http://localhost:5000/api/auth/register', {
      fullName: 'Subscription Tester',
      email: userEmail,
      password: userPass
    }).then((res) => {
      expect(res.status).to.eq(201);
    });
  });

  beforeEach(() => {
    cy.intercept('POST', '/api/subscription').as('createSub');
    cy.intercept('GET', '/api/subscription/check').as('checkSub');
    cy.intercept('GET', '/api/subscription/user').as('getUserSub');
    cy.intercept('PATCH', '/api/subscription/pause').as('pauseSub');
    cy.intercept('PATCH', '/api/subscription/resume').as('resumeSub');
    cy.intercept('DELETE', '/api/subscription/cancel').as('cancelSub');

    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]').type(userEmail);
    cy.get('input[name="password"]').type(userPass);
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  // --- TEST CASE 1: FIXED ---
  it('1. Mengisi form subscription dengan sukses', () => {
    cy.visit('http://localhost:5173/subscription');
    
    cy.wait('@checkSub');

    cy.contains('Subscribe to a Meal Plan').should('be.visible');

    cy.get('input[name="phone"]').type('081234567890');
    cy.contains('Protein Plan').click();
    cy.contains('Lunch').click();
    cy.contains('Mon').click();
    cy.contains('Wed').click();
    cy.contains('Fri').click();
    cy.get('textarea[name="allergies"]').type('Tidak pakai kacang');

    cy.get('button[type="submit"]').click();

    // 1. Tunggu Backend Create Sukses
    cy.wait('@createSub').its('response.statusCode').should('eq', 201);

    // 2. Tunggu Frontend Re-Check (Perubahan UI Form -> Dashboard)
    cy.wait('@checkSub');

    // 3. Tunggu Dashboard Fetch Data
    cy.wait('@getUserSub', { responseTimeout: 10000 });

    // 4. Assertion 
    cy.contains('Your Meal Plan Summary', { timeout: 10000 }).should('be.visible');
    
    // Validasi detail lain
    cy.contains('Protein').should('be.visible');
    cy.contains('Rp516.000').should('be.visible');
  });

  it('2. Melakukan Pause Subscription', () => {
    cy.visit('http://localhost:5173/subscription');
    cy.wait('@checkSub');
    cy.wait('@getUserSub'); // Pastikan dashboard load dulu

    cy.contains('button', 'Pause').should('be.visible').click();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    cy.get('input[type="date"]').type(dateString);

    cy.contains('button', 'Konfirmasi Pause').click();

    cy.wait('@pauseSub');
    cy.wait('@getUserSub');

    cy.contains('PAUSED').should('be.visible');
    cy.contains('Resume').should('be.visible');
  });

  it('3. Melakukan Resume Subscription', () => {
    cy.visit('http://localhost:5173/subscription');
    
    cy.wait('@checkSub');
    cy.wait('@getUserSub');

    cy.contains('PAUSED').should('be.visible');
    cy.contains('button', 'Resume').click();

    cy.wait('@resumeSub');
    cy.wait('@getUserSub');

    cy.contains('ACTIVE').should('be.visible');
  });

  it('4. Membatalkan (Cancel) Subscription', () => {
    cy.visit('http://localhost:5173/subscription');
    
    cy.wait('@checkSub');
    cy.wait('@getUserSub');

    cy.contains('button', 'Cancel').click();
    cy.contains('button', 'Yes, Cancel').click();

    cy.wait('@cancelSub');
    cy.wait('@checkSub');

    cy.contains('Your Meal Plan Summary').should('not.exist'); // Pastikan Dashboard hilang
    cy.contains('Subscribe to a Meal Plan').should('be.visible'); // Pastikan Form muncul
  });
});