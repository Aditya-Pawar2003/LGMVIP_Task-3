import React, { useState, useRef } from 'react';
import "./Regform.css";

function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        imageLink: '',
        gender: 'male',
        skills: [],
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
    });
    const enrolledStudentsRef = useRef(null);
    const [enrolledStudents, setEnrolledStudents] = useState([]);

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSkillsChange = (event) => {
        const skills = [...formData.skills];
        const skill = event.target.value;

        if (skills.includes(skill)) {
            skills.splice(skills.indexOf(skill), 1);
        } else {
            skills.push(skill);
        }

        setFormData({
            ...formData,
            skills: skills,
        });
    };

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};

        if (formData.name.trim() === '') {
            newErrors.name = 'Name is required';
            formIsValid = false;
        }

        if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
            newErrors.email = 'Invalid email address';
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            setErrors({}); 
            handleEnroll();
        }
    };
    const handleRemoveStudent = (index) => {
        const updatedEnrolledStudents = [...enrolledStudents];
        updatedEnrolledStudents.splice(index, 1);
        setEnrolledStudents(updatedEnrolledStudents);
    };
    const handleEnroll = () => {
        setEnrolledStudents([...enrolledStudents, formData]);
        setFormData({
            name: '',
            email: '',
            website: '',
            imageLink: '',
            gender: 'male',
            skills: [],
        });

        enrolledStudentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleClear = () => {
        setFormData({
            name: '',
            email: '',
            website: '',
            imageLink: '',
            gender: 'male',
            skills: [],
        });
        setErrors({});
    };

    return (
        <div className="registration-container">
            <div className="form-container">
                <h2 className="heading">Registration Form</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" className="form-input" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" className="form-input" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="website">Website:</label>
                        <input type="text" id="website" className="form-input" name="website" value={formData.website} onChange={handleInputChange} placeholder="Enter your website" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageLink">Image Link:</label>
                        <input type="text" id="imageLink" className="form-input" name="imageLink" value={formData.imageLink} onChange={handleInputChange} placeholder="Enter image link" />
                    </div>
                    <div className="form-group">
                        <label>Gender:</label>
                        <label>
                            <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleInputChange} />
                            Male
                        </label>
                        <label>
                            <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleInputChange} />
                            Female
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Skills:</label>
                        <label>
                            <input type="checkbox" name="skills" value="java" checked={formData.skills.includes('java')} onChange={handleSkillsChange} />
                            Java
                        </label>
                        <label>
                            <input type="checkbox" name="skills" value="html" checked={formData.skills.includes('html')} onChange={handleSkillsChange} />
                            HTML
                        </label>
                        <label>
                            <input type="checkbox" name="skills" value="python" checked={formData.skills.includes('python')} onChange={handleSkillsChange} />
                            Python
                        </label>
                    </div>
                    <div className="form-buttons">
                        <button type="button" className="enroll-button" onClick={handleEnroll}>Enroll Student</button>
                        <button type="button" className="clear-button" onClick={handleClear}>Clear</button>
                    </div>
                </form>
            </div>
            {/* to show the information of the students */}
            <div className="enrolled-students" ref={enrolledStudentsRef}>
                <h2 className="students-title">Enrolled Students</h2>
                <div className="student-cards">
                    {enrolledStudents.map((student, index) => (
                        <div key={index} className="student-card">
                            <img src={student.imageLink} alt={student.name} className="student-image" />
                            <h3 className="student-name">{student.name}</h3>
                            <p className="student-email">Email: {student.email}</p>
                            <p className="student-website">Website: {student.website}</p>
                            <p className="student-gender">Gender: {student.gender}</p>
                            <p className="student-skills">Skills: {student.skills.join(', ')}</p>
                            <button className="remove-button" onClick={() => handleRemoveStudent(index)}>Remove Student</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;
