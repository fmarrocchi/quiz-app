import React from "react";
import { Form, Checkbox, Button, Dropdown, Message, TextArea } from "semantic-ui-react";

const categories = [
  { key: 1, text: 'Cinema', value: 'Cinema' },
  { key: 2, text: 'Sports', value: 'Sports' },
  { key: 3, text: 'History', value: 'History' }
];

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      level: '',
      category: '',
      questions: [],
      succ: false,
      errors: {
        question: '',
        answer: '',
        level: '',
        category: ''
      }
    };

    //bind functions
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    let valid = true;
    let errors = {}
    
    if(!this.state.question){
      valid=false;
      errors['question'] = 'Please complete this field'
    }else{
      if(!this.state.answer){
        valid=false;
        errors['answer'] = 'Please complete this field'
      }
      else{
        if(!this.state.category){
          valid=false;
          errors['category'] = 'Please select a category'
        }
        else{
          if(!this.state.level){
            valid=false;
            errors['level'] = 'Please select a level'
          }
        }
      }
    }
    
  
    this.setState({
      errors: errors
    })
    
    return valid;
  }


  onFormSubmit(event) {  
    event.preventDefault();

    let question = this.state.question,
        answer = this.state.answer,
        level = this.state.level,
        category = this.state.category;

    if (this.validateForm()) {
      let newQuestion = [ question, answer, category, level ];
      this.setState({
        questions : [...this.state.questions, newQuestion],
        question: '',
        answer: '',
        level: '',
        category: '',
        succ: true
      }); 
      
      setTimeout( () => {
        this.setState({
          succ: false
        })
      }, 3000);
    }
    else{
      console.log("NO VALIDATED")         
    }
  }

  handleDropdownChange (event, data) { 
    event.preventDefault();
    const {name, value } = data;
    let errors = this.state.errors;

    this.setState({ 
      [name] : value,
      errors
     });

  }

  handleChange (event) {    
    event.preventDefault();
    const {name, value } = event.target;
    let errors = this.state.errors;
  
    this.setState({ 
      [name] : value,
      errors
     });
  } 

  render (){
    const {errors} = this.state
    return(
      <Form success >
        <Form.Field  required>
          <label>Question</label>
          <input 
            name="question" 
            value={this.state.question} 
            onChange={this.handleChange} 
            noValidate
          />
          <span style={{color: "red"}}>{errors["question"]}</span>
        </Form.Field>

        <Form.Field required >
          <label>Answer</label>
          <TextArea 
            name="answer" 
            value={this.state.answer} 
            onChange={this.handleChange} 
          />
          <span style={{color: "red"}}>{errors["answer"]}</span>
        </Form.Field>

        <Dropdown required
          name="category"
          value={this.state.category}
          fluid
          selection
          placeholder = "Select category"
          options={categories}
          onChange={this.handleDropdownChange}
        />
        <span style={{color: "red"}}>{errors["category"]}</span>

        <Form.Group inline>
          <label>Level:</label>
          <Checkbox
            name="level"
            label='Easy '
            value='1'
            radio
            checked={this.state.level === '1'}
            onChange={this.handleDropdownChange}
          />
          <Checkbox
            name="level"
            label='Medium '
            value='2'
            radio
            checked={this.state.level === '2'}
            onChange={this.handleDropdownChange}
          />
          <Checkbox
            name="level"
            label='Difficult '
            value='3'
            radio
            checked={this.state.level === '3'}
            onChange={this.handleDropdownChange}
          />          
        </Form.Group>
        <span style={{color: "red"}}>{errors["level"]}</span>

        {this.state.succ ? (
            <Message
              success
              header='Form Completed'
              content="You created a new question"
            />          
        ) : (
          ""
        )}

        <div>
         <Button type='submit' onClick={this.onFormSubmit}>Submit</Button>
        </div>
       
      </Form>
    )
  }
}

export default QuestionForm;