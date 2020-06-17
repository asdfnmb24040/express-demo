const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // author: authorSchema, ///
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAutor(courseId) {
  // let course = await Course.findById(courseId);
  // course.author.name = 'new name';
  // course.save();

  let course = await Course.update({
    _id: courseId
  }, {
    $set: {
      'author.name': 'john smith'
    }
  });

}

async function addAuthor(courseId,author) {
   const course = await Course.findById(courseId);
   course.authors.push(author);
   course.save();
}

async function removeAuthor(courseId,authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

removeAuthor('5ee1c57fd1a48a62888bb767','5ee1c57fd1a48a62888bb765');

// addAuthor('5ee1c57fd1a48a62888bb767',new Author({name:'Armand'}));

// createCourse('Node Course',[
//     new Author({ name: 'Mosh'}), 
//     new Author({ name: 'Json'})
// ]);

// updateAutor('5ee096f06ddfd245d4955e10');