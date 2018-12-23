var selenium = require('selenium-webdriver');

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Chức năng tạo khóa học', function() {

    beforeEach(async function(done) {
        this.driver = new selenium.Builder().
            withCapabilities(selenium.Capabilities.chrome()).
            build();

        await this.driver.get('https://kevin1088.herokuapp.com/courses');

        let usernameEl = this.driver.findElement(selenium.By.name('username')),
            passwordEl = this.driver.findElement(selenium.By.name('password')),
            buttonEl = this.driver.findElement(selenium.By.tagName('button'));

        await usernameEl.sendKeys("lathao");
        await passwordEl.sendKeys("lathao");
        await buttonEl.click();
        await sleep(3000);
        const courseAEl = await this.driver.findElement(selenium.By.linkText("Courses"));
        await courseAEl.click();
        await sleep(3000);

        const value = await this.driver.getCurrentUrl();
        expect(value).toContain('course');
        done();
    }, 100000);


    afterEach(function(done) {
        this.driver.quit().then(done);
    });

    it('Nên đăng nhập', async function(done) {

        const course = {
            name: "KCPM",
            code: "ABCD",
            officeHour: "8am - 5pm",
            note: "...",
        };

        const addCourseEl = this.driver.findElement(selenium.By.css('.btn.btn-primary.btn-round'));
        await addCourseEl.click();
        await sleep(2000);

        const nameEl = this.driver.findElement(selenium.By.name("name")),
              codeEl = this.driver.findElement(selenium.By.name("code")),
              officeHourEl = this.driver.findElement(selenium.By.name("office_hour")),
              noteEl = this.driver.findElement(selenium.By.name("note"));
        
        await nameEl.sendKeys(course.name);
        await codeEl.sendKeys(course.code);
        await officeHourEl.sendKeys(course.officeHour);
        await noteEl.sendKeys(course.note);
        await sleep(3000);

    }, 100000);

});