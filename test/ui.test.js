const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function () {
    this.timeout(30000); 
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build(); 
    });

    after(async function () {
        await driver.quit();
    });

    it('should load the login page', async function () {
        await driver.get('D:/TITIP/ppmpl/ppmpl-seleniumUI/loginPage.html'); 
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should input username and password using CSS Selectors', async function () {
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.css('#password')).sendKeys('password123');
        
        const usernameValue = await driver.findElement(By.css('#username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.css('#password')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should input data using CSS Selector and XPath', async function () {

        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('password')).clear();

        await driver.findElement(By.css('#username')).sendKeys('testuser');

        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');

        const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');

        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });
    
    it('should click the login button and validate successful login', async function () {
        await driver.findElement(By.css('#loginButton')).click();
        
        
        const dashboardElement = await driver.wait(
            async () => {
                const el = await driver.findElement(By.id('dashboardElement')); 
                return el.isDisplayed() ? el : null;
            },
            10000
        );

        expect(dashboardElement).to.exist; 
    });

    it('should handle failed login attempts', async function () {
        await driver.get('D:/TITIP/ppmpl/ppmpl-seleniumUI/loginPage.html'); 
        
        await driver.findElement(By.css('#username')).sendKeys('wronguser');
        await driver.findElement(By.css('#password')).sendKeys('wrongpassword');
        await driver.findElement(By.css('#loginButton')).click();
        
        const errorMessageElement = await driver.wait(
            async () => {
                const el = await driver.findElement(By.id('errorMessage'));
                return el.isDisplayed() ? el : null;
            },
            10000 
        );

        const errorMessage = await errorMessageElement.getText();
        expect(errorMessage).to.equal('Invalid username or password.'); 
    });

    it('should validate visibility of login elements', async function () {
        const isLoginButtonDisplayed = await driver.findElement(By.css('#loginButton')).isDisplayed();
        expect(isLoginButtonDisplayed).to.be.true;

        const isUsernameFieldDisplayed = await driver.findElement(By.css('#username')).isDisplayed();
        expect(isUsernameFieldDisplayed).to.be.true;

        const isPasswordFieldDisplayed = await driver.findElement(By.css('#password')).isDisplayed();
        expect(isPasswordFieldDisplayed).to.be.true;
    });
});
