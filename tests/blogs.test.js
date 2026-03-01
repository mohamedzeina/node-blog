const Page = require('./helpers/page');

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto('http://localhost:3000');
});

afterEach(async () => {
	await page.close();
});

describe('When logged in', () => {
	beforeEach(async () => {
		await page.login();
		await page.click('a[href="/blogs/new"]');
	});

	test('Can see blog create form', async () => {
		const label = await page.getContentsOf('form label');
		expect(label).toEqual('Blog Title');
	});

	describe('And using valid inputs', () => {
		beforeEach(async () => {
			await page.type('.title input', 'Test Blog');
			await page.type('.content input', 'This is a test blog content');
			await page.click('form button');
		});

		test('Submitting takes user to review screen', async () => {
			const confirmationHeader = await page.getContentsOf('h5');
			expect(confirmationHeader).toEqual('Review Your Post');
		});

		test('Submitting then saving adds blog to index page', async () => {
			await page.click('button[type="submit"]');
			await page.waitFor('.card');

			const title = await page.getContentsOf('.blog-title');
			const content = await page.getContentsOf('p');

			expect(title).toEqual('Test Blog');
			expect(content).toEqual('This is a test blog content');
		});
	});

	describe('And using invalid inputs', () => {
		beforeEach(async () => {
			await page.click('form button');
		});

		test('The form shows an error message', async () => {
			const titleError = await page.getContentsOf('.title .field-error');
			const contentError = await page.getContentsOf('.content .field-error');

			expect(titleError).toEqual('You must provide a value');
			expect(contentError).toEqual('You must provide a value');
		});
	});
});

describe('When not logged in', () => {
	test('Blog related actions are prohibited', async () => {
		const actions = [
			{
				method: 'get',
				path: '/api/blogs',
			},
			{
				method: 'post',
				path: '/api/blogs',
				data: {
					title: 'Test Blog',
					content: 'This is a test blog :D',
				},
			},
		];

		const results = await page.execRequests(actions);

		for (let result of results) {
			expect(result).toEqual({ error: 'You must log in!' });
		}
	});
});
