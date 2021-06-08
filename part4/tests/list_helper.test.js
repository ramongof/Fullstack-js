const supertest = require('supertest');
const mongoose = require('mongoose');
const listHelper = require('./list_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(listHelper.initialBlogs);
});

describe('Testing Blogs', () => {    
    test('dummy returns number of blogs', () => {
        const result = listHelper.dummy(listHelper.initialBlogs);
        expect(result).toBe(6);
    });

    test('Total likes return total', () => {
        const result = listHelper.totalLikes(listHelper.initialBlogs);
        expect(result).toBe(36);
    });

    test('Most liked blog', () => {
        const result = listHelper.mostLiked(listHelper.initialBlogs);
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        });
    });

    test('Most blogs', () => {
        const result = listHelper.mostBlogs(listHelper.initialBlogs);
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        });
    });

    test('Most Likes blog', () => {                
        const result = listHelper.mostLikes(listHelper.initialBlogs);        
        expect(result).toEqual({            
            author: "Edsger W. Dijkstra",
            likes: 17            
        });
    });
});

afterAll(() => {
  mongoose.connection.close();
});