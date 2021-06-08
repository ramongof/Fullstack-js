const Blog = require("../models/blog");

const initialBlogs = [     
    {
        _id: "5a422b891b54a676234d17fa", 
        title: "First class tests", 
        author: "Robert C. Martin", 
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
        likes: 10, 
        __v: 0 
    }, 
    { 
        _id: "5a422ba71b54a676234d17fb", 
        title: "TDD harms architecture", 
        author: "Robert C. Martin", 
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
        likes: 0, 
        __v: 0 
    }, 
    { 
        _id: "5a422bc61b54a676234d17fc", 
        title: "Type wars", 
        author: "Robert C. Martin", 
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
        likes: 2, 
        __v: 0 
    },   
    { 
        _id: "5a422a851b54a676234d17f7", 
        title: "React patterns", 
        author: "Michael Chan", 
        url: "https://reactpatterns.com/", 
        likes: 7,
        __v: 0 
    },                 
    { 
        _id: "5a422aa71b54a676234d17f8", 
        title: "Go To Statement Considered Harmful", 
        author: "Edsger W. Dijkstra", 
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
        likes: 5,
        __v: 0 
    }, 
    { 
        _id: "5a422b3a1b54a676234d17f9", 
        title: "Canonical string reduction", 
        author: "Edsger W. Dijkstra", 
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
        likes: 12, 
        __v: 0 
    }
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
}

const dummy  = blogs => blogs.length;

const totalLikes = (blogs) => {
    const likes = blogs.map(v => v.likes).reduce((v, i) => v + i);
    return likes;
}

const mostLiked = (blogs) => {
    const mostLikes = Math.max(...blogs.map(v => v.likes))
    const result = blogs
    .map(v => {
        const matrix = {};
        matrix.title = v.title;
        matrix.author = v.author;
        matrix.likes= v.likes;
        return matrix;
    })
    .find(v => v.likes === mostLikes);
    return result;
}

const mostBlogs = (blogs) => {
    let authors = blogs.map(v => v.author);
    let controlle = 1;
    let name = '';
    const matrix = {};
    const result = authors.reduce((p,c) => {
        if( name === '' )  {
            matrix.author = p;
            matrix.blogs = controlle;
            name = p;                     
        }
                
        if( name === c ) {
            controlle ++;
        } else {
            name = c;
            controlle = 0;
        };                    

        if( matrix.blogs < controlle ) {
            matrix.author = name;
            matrix.blogs = controlle + 1;
        };
        return matrix;
    });
    return result;
}

const mostLikes = (blogs) => {
    let name = '';
    let likes = 0;
    const matrix = {};

    const authors = blogs.map(v => {
        const table = {};  
        table.author = v.author;
        table.likes= v.likes;
        return table;
    });        
    
    const result = authors.reduce((p,c) => {                       
        if( name === '') {
            name = c.author;
            likes = c.likes; 
            matrix.author = c.author;
            matrix.likes = c.likes;
        }else {                               
            if( name === c.author ) {                
                likes = (c.likes + likes);                    
            }else {                                        
                likes = c.likes;
                name = c.author;
            };                
        }

        if( matrix.likes < likes ) {
            matrix.author = name;
            matrix.likes = likes;                        
        };            
        return matrix;
    });
    return result;
}

module.exports = {
    initialBlogs,
    dummy,
    totalLikes,
    mostLiked,
    mostBlogs,
    mostLikes
}