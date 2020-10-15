import HelpBoard from '../../../elements/pages/helpBoard'
import Post from '../../../elements/pages/post'

describe('FightPandemics Post for unauthorized user', () => {

    const helpBoard = new HelpBoard();
    const post = new Post();
    const shareViaModalWindowTitle = "Share via..."
 

    context('User opens Help Board', () => {
        beforeEach(() => {
            helpBoard.visit();
        });

        it('Unauthorized user is redirected to SignIn page when clicking on Like button', () => {        
            cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(($firstPost) => { 
                cy.get(post.getLikeButtonSelector()).click();
                cy.validateCorrectScreenIsOpen("auth/login");
            })                                                      
        });

        it('Unauthorized user is redirected to SignIn page when clicking on Comment button', () => {     
            cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(($firstPost) => { 
                cy.get(post.getCommentButtonSelector()).click();
                cy.validateCorrectScreenIsOpen("auth/login");
            })                                          
        });

        it('Unauthorized user can share a post. Share via... modal window is displayed', () => {  
            var postTitle;  
            cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(($firstPost) => { 
                var postTitleElement = post.getPostTitle();
                postTitleElement.invoke('text').then((text => {
                    postTitle = text.toString();
                }));
                post.getShareButton().click();
            })  
            cy.get(post.getModalWindowShareViaSelector()).within(($modalWindow) => { 
                var modalWindowTitle = post.getModalWindowShareViaH4Title();
                modalWindowTitle.should('be.visible').contains(shareViaModalWindowTitle);
                validateSocialMediaShareButton(post.getModalWindowEmailButton(), 'title', postTitle);
                validateSocialMediaShareButton(post.getModalWindowFacebookButton(), 'aria-label', 'facebook');;
                validateSocialMediaShareButton(post.getModalWindowLinkedinButton(), 'aria-label', 'linkedin');
                validateSocialMediaShareButton(post.getModalWindowRedditButton(), 'aria-label', 'reddit');
                validateSocialMediaShareButton(post.getModalWindowTelegramButton(), 'aria-label', 'telegram');
                validateSocialMediaShareButton(post.getModalWindowTwitterButton(), 'aria-label', 'twitter');
                validateSocialMediaShareButton(post.getModalWindowWhatsappButton(), 'aria-label', 'whatsapp');

                var sharingPostLink = post.getModalWindowSharingUrlInput();
                sharingPostLink.should('have.attr', 'value').and('contain', "/post/");

                var closeModalWindowButton = post.getModalWindowCloseButton();
                closeModalWindowButton.should('be.visible').click();
            
            })
            post.getModalWindowShareVia().should('not.exist');                                                       
        });

        it('Unauthorized user can click on a post header and is redirected to the post\'s author screen', () => {  
            cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(($firstPost) => { 
                post.getPostAuthorUrl().invoke('attr', 'href')
                .then(value => {
                    post.getPostHeader().click();                     
                    cy.validateCorrectScreenIsOpen(value);               
            });
        }) 
    }) ;

    function validateSocialMediaShareButton(getMethod, attr, socialMedial) {
        (getMethod).should('have.attr', attr, socialMedial).and('be.visible');
    }
});

});
