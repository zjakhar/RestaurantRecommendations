import React, { useState } from "react"
import ErrorList from "./ErrorList"
import _ from 'lodash'

const FormComponent = props => {
  const [errors, setErrors] = useState ({})
  const [formRecord, setFormRecord] = useState({
    // restaurant_id: "",
    name: "",
    rating: "",
    content: ""
  })

  // const fieldToUpdate = "restaurant_id"
  // formRecord[fieldToUpdate] = props.selectedId

  const handleInputChange = event => {
    setFormRecord({
      ...formRecord,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

const validFormSubmission = () => {
  let submitErrors = {}
  const requiredFields = ["name", "rating", "content"]
  requiredFields.forEach(field => {

    if(formRecord[field].trim() === "") {
      submitErrors = {
        ...submitErrors,
        [field]: "is blank"
      }
    }
  })
  setErrors(submitErrors)
  return _.isEmpty(submitErrors)
}

  const onSubmitHandler = event => {
    event.preventDefault()
    if (validFormSubmission()){
      props.onReviewSubmitted(formRecord)
    }
    setFormRecord({
      // restaurant_id: "",
      name: "",
      rating: "",
      content: ""
    })

  }

  return (
    <form onSubmit={onSubmitHandler}>
      <ErrorList errors={errors} />
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={formRecord.name}
          onChange={handleInputChange}
        />

        <label htmlFor="rating">Rating</label>
        <input
          id="rating"
          type="text"
          value={formRecord.rating}
          onChange={handleInputChange}
        />

        <label htmlFor="content">Review</label>
        <input
          id="content"
          type="text"
          value={formRecord.content}
          onChange={handleInputChange}
        />

        <div className="button-group">
          <input type="submit" value="Submit" className="button"/>
        </div>

      </div>
    </form>
  )
}

export default FormComponent
