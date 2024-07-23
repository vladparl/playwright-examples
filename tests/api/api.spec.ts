import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('JSONPlaceholder API Tests', () => {

  let initialNumberOfPosts: Number;
  let newPostId = null;

  test('Read the total number of posts', async ({ request }) => {
    const response = await request.get('/posts', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    initialNumberOfPosts = responseBody.length;
  });

  test('Create a new post and store its ID', async ({ request }) => {
    const response = await request.post('/posts', {
      data: {
        title: 'title',
        body: 'body',
        userId: 10
      }
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    newPostId = responseBody.id;
  });

  //The test below fails with status code 404, because according API documentation: https://jsonplaceholder.typicode.com/guide/ new post won't be created 
  //on the server, thus we cannot retrieve it by GET.
  test.skip('Get only the created post by ID', async ({ request }) => {   
    const response = await request.get(`/posts/${newPostId}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(newPostId);
    expect(responseBody.title).toBe('title');
    expect(responseBody.body).toBe('body');
    expect(responseBody.userId).toBe(10);
  });

  //This is a working test how to retrieve an existing post with ID: 100 using GET method
  test('Get the post with ID: 100', async ({ request }) => {   
    const response = await request.get('/posts/18', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(18);
    expect(responseBody.userId).toBe(2);
    expect(responseBody.title).toBe('voluptate et itaque vero tempora molestiae');
    expect(responseBody.body).toBe('eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam');
  });

  //Test case below with PATCH and GET fails, because according the API documentation: "https://jsonplaceholder.typicode.com/guide/" real changes are not made, 
  //thus I cannot PATCH and GET with not existing post id. But, in case if changes were allowed, this test would work.
  test.skip('Send a PATCH request to update the post and GET to verify the changes', async ({ request }) => {   
    const response = await request.patch(`/posts/${newPostId}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: {
        title: 'Updated title',
        body: 'Updated body'
      }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.title).toBe('Updated title');
    expect(responseBody.body).toBe('Updated body');

    const getResponse = await request.get(`/posts/${newPostId}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    expect(response.status()).toBe(200);
    const getResponseBody = await getResponse.json();
    expect(getResponseBody.title).toBe('Updated title');
    expect(getResponseBody.body).toBe('Updated body');
  });

  test('Delete the post and verify that the post is deleted', async ({ request }) => {
    const deleteResponse = await request.delete(`/posts/${newPostId}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    expect(deleteResponse.status()).toBe(200);

    const getResponse = await request.get(`/posts/${newPostId}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    expect(getResponse.status()).toBe(404);
  });

  test('Check the total number of posts to ensure the integrity', async ({ request }) => {
    const response = await request.get('/posts', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    let currentNumberOfPosts = responseBody.length;
    expect(`${initialNumberOfPosts}`).toBe(`${currentNumberOfPosts}`);
  });
});
