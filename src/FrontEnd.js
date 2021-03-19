import React from 'react'
import axios from 'axios'

class FrontEnd extends React.Component{
    constructor() {
        super()
        this.state={
            frontEndDevelopers : []
        }
    }

    componentDidMount(){
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
        .then(response=>{
            console.log(response.data)
            const frontEndDevelopers= response.data.filter(ele=>ele.jobTitle == 'Front-End Developer')
            this.setState({frontEndDevelopers})
        })

        .catch(err=>{
            console.log(err)
        })
    }

    handleDetails = (object) => {
        window.alert(`${object.name} Profile
-------------------------------------------------
        Contact Number :  ${object.phone}, 

        Email :  ${object.email}, 

        Skills:  ${object.skills}, 

        Experience:  ${object.experience}`)
    }

    handleShortlisted = (id) => {
        const body = {
            status: 'shortlisted'
        }

        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`, body )
        .then((response) => {
            console.log(response.data)           
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    handleRejected = (id) => {
        const body = {
            status: 'rejected'
        }

        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`, body )
        .then((response) => {
            console.log(response.data)           
        })
        .catch((err) =>{
            console.log(err)

        })
    }

    render(){
    return (
      <div>
        <h1> Front End Developers</h1>
        <h3> List of candidates applied for front end developer job</h3>
        <table border='1' >
            <thead>
                <tr>
                    <th> Name</th>
                    <th> Technical skills</th>
                    <th> Experience</th>
                    <th> Applied Date</th>
                    <th> View Details</th>
                    <th> Update Application Status</th>
  
                </tr>
            </thead>

            <tbody>
                {
                   this.state.frontEndDevelopers.map((ele,i) =>{
                       return(
                            <tr key={i}>
                                <td> {ele.name}</td>
                                <td> {ele.skills}</td>
                                <td> {ele.experience}</td>
                                <td> {ele.createdAt.slice(0,10)}</td>
                                <td> { <button onClick={() => {
                                                   this.handleDetails(ele)
                                                    }} className="btn btn-primary"> View Details</button>}</td>
                                <td> 
                                {(ele.status=="applied") && 
                                    <div>
                                    <button onClick= {() => {
                                        this.handleShortlisted(ele._id)
                                    }} className="btn btn-success">Shortlist</button>
                                      <button onClick={()=> {
                                          this.handleRejected(ele._id)
                                      }} className="btn btn-danger">Reject</button>
                                    </div>
			                       }
                                  {(ele.status== "shortlisted") && <button onClick ={this.handleShortlisted}>Shortlist</button>}
                                  {(ele.status== "rejected") && <button onClick ={this.handleRejected}>Reject</button>}

                                </td>
                            </tr>
                       )
                   }) 
                }
            </tbody>
        </table>
      </div>      
  )
 }
}

export default FrontEnd