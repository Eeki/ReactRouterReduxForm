import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';


class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object //This give us a access to property called  this.context.router
  };

  onSubmit(props) {
    this.props.createPost(props) // When ever we create an action creater that creates a promise as its payload. This call will return that same promise.
      .then(() => { //.then --> when promise is successfully resolves
        //Blogpost has been created, navigate the user to the index. We navigate by calling this.context.router.push with the new path to navigate to.
        this.context.router.push('/');
      });
  }

  render () {
    const { fields: { title, categories, content }, handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''} {/*if title.touched == true -> return title.error, if title.touched == false -> return ""*/}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control"  {...categories}/>
          <div className="text-help">
            {categories.touched ? categories.error : ''} {/*if title.touched == true -> return title.error, if title.touched == false -> return ""*/}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea className="form-control"  {...content}/>
          <div className="text-help">
            {content.touched ? content.error : ''} {/*if title.touched == true -> return title.error, if title.touched == false -> return ""*/}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-secondary">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content'
  }

  return errors;
}

//connect: first argument is mapSateToPropps, 2nd is mapDispatchToProps
//reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({ //reduxForm doas have exactly the same behavior as connect. RectForm can be used to inject the actionCreaters into our component and create a container. Difference is that reduxForm has one extra argument: configuration object.
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew); //2nd argument is null because we don't need any state inside our form
//Now we have access in the PostsNew to this.props.createPost






//user types something in.... reduxForm record it on application state
/*state === {
  form: {
    PostsNewForm: {
      title: '....',
      categories: '....',
      content: '....'
    }
  }
 }
}*/


//Do not abuse context! Avoid using context as much as possible. Only use context when working with react router.