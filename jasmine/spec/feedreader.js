/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        // beforeEach(function () {

        // });
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('allFeeds variable are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         var feedUrl = [];

        beforeEach(function() {

            for (i = 0; i < allFeeds.length; i++) {
              var feed_URL = allFeeds[i].url;
              feedUrl.push(feed_URL);
            }
        });
        
        it('have a URL that is defined', function() {
            expect(feedUrl).toBeDefined();
        });

        it('and do not have an empty URL', function() {
            // passes if URL is a non empty string
            expect(feedUrl).not.toContain('');
        });
        

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        var feedName = [];

        beforeEach(function() {
          
          for (i = 0; i < allFeeds.length; i++) {
              var feed_NAME = allFeeds[i].name;
              feedName.push(feed_NAME);
          }
        });

        it('have a name that is defined', function() {
            expect(feedName).toBeDefined();
        });

        it('and does not have an empty name', function() {
            // passes if name is a non empty string
            expect(feedName).not.toContain('');
        });
         
    });

    describe('The menu', function() {
        var $menuIcon = $('.menu-icon-link');
        var $hiddenClass = $('body').hasClass('menu-hidden');
                
        /* A test that ensures the menu element is
         * hidden by default.
         */
        it('hides by default', function() {
            expect($hiddenClass).toBeTruthy();
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('displays when clicked and hides when clicked again', function() {

            $menuIcon.trigger('click');
            // looks for the menu-hidden class after the trigger click. Re-checks the state of the current DOM.
            var $hiddenClass = $('body').hasClass('menu-hidden');
            expect($hiddenClass).toBeFalsy();

            $menuIcon.trigger('click');
            // looks for the menu-hidden class after the trigger click. Re-checks the state of the current DOM.
            $hiddenClass = $('body').hasClass('menu-hidden');
            expect($hiddenClass).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            // Calls loadFeed() method, which is an asynchronous function.    
            loadFeed(0, function() {
                // The done() will signal the framework that our async function is done, and we can continue testing.
                done();
            });
        });

        it('has at least a single .entry element within the .feed container', function(done) {

            expect(testingPurposes).toBeDefined();
            expect(testingPurposes).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var $feedA; // Will compare this variable with var $feedB

        beforeEach(function(done) {

            loadFeed(2, function() {
                $feedA = $('.feed').html();
                done();
            });
        });

        it('content changes when a new feed is loaded', function(done) {
            var $feedB;

            loadFeed(0, function() {
                $feedB = $('.feed').html();
                done();
            });

            expect($feedB).not.toEqual($feedA);
            done();
        });
    });
}());
