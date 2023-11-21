describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:80/api/testing/reset')
    const user1 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const user2 = {
        name: 'Konrad Konkel',
        username: 'konradk',
        password: 'kiloczekolady'
      }
    cy.request('POST', 'http://localhost:80/api/users/', user1)
    cy.request('POST', 'http://localhost:80/api/users/', user2) 

      cy.visit('http://localhost:5173')
    })
  
    it('Login form is shown', function() {
      cy.get('.loginForm').should('contain', 'Log in to application')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.contains('logout')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            // ... check if displayed message is red
            cy.get('.error').should('contain', 'Wrong credentials')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
      })

      describe('When logged in', function() {
        beforeEach(function() {
            cy.contains('login')
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.contains('logout')
        })
    
        it('A blog can be created', function() {
            const blogTitle = 'Blog Title Sample 1'
            cy.contains('new blog').click()
            cy.get('#logout')
            cy.get('#title').type(blogTitle)
            cy.get('#author').type('Konrad Konkel')
            cy.get('#url').type('somerandomurl.org')
            cy.get('#create').click()
            cy.contains(blogTitle)
        })

        it('A blog can be liked', function() {
            const blogTitle = 'Blog Title Sample 2'
            cy.contains('new blog').click()
            cy.get('#logout')
            cy.get('#title').type(blogTitle)
            cy.get('#author').type('Konrad Konkel')
            cy.get('#url').type('somerandomurl.org')
            cy.get('#create').click()
            cy.contains(blogTitle)
            cy.get('#view').click()
            cy.get('#like').click()
            cy.contains('likes 1')
        })

        it('A blog can be deleted', function() {
            const blogTitle = 'Blog Title Sample 2'
            cy.contains('new blog').click()
            cy.get('#logout')
            cy.get('#title').type(blogTitle)
            cy.get('#author').type('Konrad Konkel')
            cy.get('#url').type('somerandomurl.org')
            cy.get('#create').click()
            cy.contains(blogTitle)
            cy.get('#view').click()
            cy.get('#remove').click()
            cy.contains(blogTitle).should('not.exist')
        })

        it('A blog can be deleted only by the person who added it', function() {
            // add blog and check if created and can be deleted by the creator
            const blogTitle = 'Blog Title Sample 3'
            cy.contains('new blog').click()
            cy.get('#title').type(blogTitle)
            cy.get('#author').type('Konrad Konkel')
            cy.get('#url').type('somerandomurl.org')
            cy.get('#create').click()
            cy.contains(blogTitle)
            cy.get('#view').click()
            cy.get('#remove')

            // logout
            cy.get('#logout').click()

            // login as other user
            cy.contains('login').click()
            cy.get('#username').type('konradk')
            cy.get('#password').type('kiloczekolady')
            cy.get('#login-button').click()
            cy.contains('logout')

            // check if the blog created by user1 cannot be deleted by user2
            cy.contains(blogTitle)
            cy.get('#view').click()
            cy.contains('#remove').should('not.exist')
        })

        it('Blogs are ordered accordingly to the amounts of likes', function() {
            const blogTitle1 = 'Blog Title Sample 1'
            const blogTitle2 = 'Blog Title Sample 2'
            const blogTitle3 = 'Blog Title Sample 3'

            // add blog1
            cy.get('#newBlog').click()
            cy.get('#title').type(blogTitle1)
            cy.get('#author').type('Konrad Konkel')
            cy.get('#url').type('somerandomurl.org')
            cy.get('#create').click().wait(1000)

            // add blog2
            cy.get('#newBlog').click()
            cy.get('#title').type(blogTitle2)
            cy.get('#author').type('Konrad Konkel')
            cy.get('#url').type('somerandomurl.org')
            cy.get('#create').click().wait(1000)

            // add blog3
            cy.get('#newBlog').click()
            cy.get('#title').type(blogTitle3)
            cy.get('#author').type('Konrad Konkel')
            cy.get('#url').type('somerandomurl.org')
            cy.get('#create').click().wait(1000)

            // view and like blogs
            cy.get('.blog').eq(0).should('exist').find('#view').click().wait(1000)
            cy.get('.blog').eq(1).should('exist').find('#view').click()
            cy.get('.blog').eq(1).find('#like').click().wait(1000)
            cy.get('.blog').eq(0).find('#like').click().wait(1000)
            cy.get('.blog').eq(2).should('exist').find('#view').click()
            cy.get('.blog').eq(2).find('#like').click().wait(1000)

            //check order
            cy.get('.blog').eq(0).should('contain', blogTitle2)
            cy.get('.blog').eq(1).should('contain', blogTitle3)
            cy.get('.blog').eq(2).should('contain', blogTitle1)
        })
      })
  })