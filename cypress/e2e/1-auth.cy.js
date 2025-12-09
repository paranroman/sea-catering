describe('Modul Otentikasi (Authentication)', () => {
  const uniqueId = Date.now();
  // Kita gunakan 'let' atau modifikasi properti objek agar bisa diupdate nanti
  const newUser = {
    fullName: 'Cypress Tester',
    email: `auth${uniqueId}@seacatering.com`,
    password: '#Password123'
  };

  // --- TEST CASE 1: REGISTER GAGAL ---
  it('1. Harus gagal register jika password lemah', () => {
    cy.visit('http://localhost:5173/register');
    cy.get('input[name="fullName"]').type(newUser.fullName);
    cy.get('input[name="email"]').type(newUser.email);
    cy.get('input[name="password"]').type('lemah123'); 
    cy.get('input[name="confirmPassword"]').type('lemah123');
    cy.get('button[type="submit"]').click();
    cy.contains('Password harus minimal 8 karakter').should('be.visible');
  });

  // --- TEST CASE 2: REGISTER SUKSES ---
  it('2. Harus berhasil register dengan data valid', () => {
    cy.visit('http://localhost:5173/register');
    cy.get('input[name="fullName"]').type(newUser.fullName);
    cy.get('input[name="email"]').type(newUser.email);
    cy.get('input[name="password"]').type(newUser.password);
    cy.get('input[name="confirmPassword"]').type(newUser.password);
    cy.get('button[type="submit"]').click();
    
    cy.contains('Pendaftaran berhasil').should('be.visible');
    cy.url({ timeout: 10000 }).should('include', '/login');
  });

  // --- TEST CASE 3: LOGIN SUKSES ---
  it('3. Harus berhasil login dengan akun baru', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]').type(newUser.email);
    cy.get('input[name="password"]').type(newUser.password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains('Get Started').should('not.exist');
  });

// --- TEST CASE 4: UPDATE PROFILE (REVISI STABIL) ---
  it('4. Harus berhasil mengupdate profil (Nama & Email)', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]').type(newUser.email);
    cy.get('input[name="password"]').type(newUser.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:5173/'); 
    cy.wait(1000);

    cy.get('nav button.text-3xl').filter(':visible').click();
    cy.url().should('include', '/profile');

    cy.contains('button', 'Edit Profile').click();

    const updatedName = 'Cypress Ganteng Banget';
    const updatedEmail = `updated${uniqueId}@seacatering.com`;
    
    // Strategi Robust Clear: Type {selectall}{backspace}
    cy.get('input[name="fullName"]')
      .type('{selectall}{backspace}')
      .type(updatedName);
      
    cy.get('input[name="email"]')
      .type('{selectall}{backspace}')
      .type(updatedEmail);

    cy.contains('button', 'Save Changes').click();

    cy.contains('Profile updated successfully').should('be.visible');

    cy.reload();
    // Tunggu sebentar setelah reload agar value input terisi dari API
    cy.wait(1000); 

    cy.get('input[name="fullName"]').should('have.value', updatedName);
    cy.get('input[name="email"]').should('have.value', updatedEmail);

    newUser.email = updatedEmail;
  });

  // --- TEST CASE 5: LOGOUT ---
  it('5. Harus bisa logout', () => {
    cy.visit('http://localhost:5173/login');
    
    // Login menggunakan email yang sudah diupdate dari Test Case 4
    cy.get('input[name="email"]').type(newUser.email);
    cy.get('input[name="password"]').type(newUser.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:5173/'); 
    cy.wait(1000); 

    cy.get('nav button.text-3xl').filter(':visible').click();
    
    cy.contains('button', 'Logout').click();
    cy.contains('Logout Confirmation').should('be.visible');
    cy.contains('button', 'Yes, Logout').click();

    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains('Get Started').should('be.visible');
  });
});