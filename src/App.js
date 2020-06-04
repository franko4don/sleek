import React, { useEffect, useState} from "react";
import "./App.css";
import User from "./components/User";
import fetchStudentData from "./services/dataService";

function App() {
  const [student, setStudent] = useState([]);
  const [filteredStudent, setFilteredStudent] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const onChange = e => {
    let result = student.students.filter((item) => {
      return (
        item.firstName.toLowerCase() +
        " " +
        item.lastName.toLowerCase()
      ).includes(e.target.value.toLowerCase());
    });
    setQuery(e.target.value);
    setFilteredStudent({ students: result });
  };

  const onTagChange = e => {
    let result = student.students.filter((item) => {
      if(item.tags){
        return item.tags.join(" ").toLowerCase().includes(e.target.value.toLowerCase())
      }
      if(e.target.value.toLowerCase().length === 0){
        return true;
      }
      
      return false;
      
    });

    setFilteredStudent({ students: result });
  };

  const onTagReceived = (data) => {
    let students = student;
    students = students.students.map((item, index) => {
      if(item.id === data.id){
        if(item.tags){
          item.tags.push(data.value);
        }else{
          item.tags = [data.value]
        }
      }
      return item;
    });
    setStudent({students:students});
  }

  useEffect(() => {
    fetchStudentData()
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
        setLoading(false);
        setFilteredStudent(data);
      });
  }, []);
  
  if (loading) return <div>Loading ...</div>;
  return (
    <div className="App">
        <div>
          <input
            onChange={onChange}
            type="text"
            value={query}
            className="search"
            style={{position: 'inline'}}
            placeholder="Search by name"
          />
        </div>
        <div>
          <input
            onChange={onTagChange}
            type="text"
            className="search"
            style={{position: 'inline'}}
            placeholder="Search by tag"
          />
        </div>
        {filteredStudent.students?.map((item, index) => (
          <User 
            key={index} 
            index={index} 
            onTagReceived={(data) => onTagReceived(data)} 
            item={item} 
          />
        ))}
    
    </div>
  );
}

export default App;
