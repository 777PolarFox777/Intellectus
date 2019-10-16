describe('Smoke tests', () => {
  
  describe('UI', () => {
    
    beforeEach(() => {
      cy.visit('/');
    })

    it('Passing a test', () => {
      cy.get('.play-icon').click();
      cy.passTest();
      cy.get('.test-view-next-button').click();
      cy.get('.stats').should('be.visible');
    })
  })

  describe('Requests', () => {
    it('Get solutions for valid token and answers', () => {
      cy.request('GET', '/questions')
        .then(resp => {
          cy.request({
            method: 'POST',
            url: '/answers',
            body: {"token": resp.body.token, "answers": [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]}
          }).then(resp => {
              expect(resp.status).to.eq(201);
          })
        })
    })

    it('Bad request on nonexistent token', () => {
      cy.request('GET', '/questions')
      cy.request({
        method: 'POST',
        url: '/answers',
        body: {"token": 'nonexistenttoken', "answers": [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]},
        failOnStatusCode: false
      }).then(resp => {
        expect(resp.status).to.eq(404);
      })
    })
    
    it('Bad request when number of answers != 12', () => {
      cy.request('GET', '/questions')
        .then(resp => {
          cy.request({
            method: 'POST',
            url: '/answers',
            body: {"token": resp.body.token, "answers": [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 6]},
            failOnStatusCode: false
          }).then(resp => {
              expect(resp.status).to.eq(400);
            })
        })
    })

    it('Bad request on second attempt to get answers for one token', () => {
      cy.request('GET', '/questions')
        .then(resp => {
          cy.request({
            method: 'POST',
            url: '/answers',
            body: {"token": resp.body.token, "answers": [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]}
          })
          cy.request({
            method: 'POST',
            url: '/answers',
            body: {"token": resp.body.token, "answers": [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]},
            failOnStatusCode: false
          }).then(resp2 => {
            expect(resp2.status).to.eq(404);
          })  
        })
    })
  })
})