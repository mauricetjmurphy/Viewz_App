function showImageContainer(arr) {
    if (arr.length === 0) {
        return true;
    } else {
        return false;
    }
}

describe("checks if the email is valid", () => {
    it("should be true", () => {
        // arrange
        const email = "test@test.com";
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // act
        const result = true;

        // assert
        expect(email).toMatch(re);
    });
});

describe("Check if array is empty", () => {
    it("should be false", () => {
        // arrange
        const views = ["1"];

        // act
        const result = showImageContainer(views);

        // assert
        expect(showImageContainer(views)).toBe(false);
    });
});
