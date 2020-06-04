import React, { useState } from "react";

export default function User({ item, onTagReceived, index }) {
  const [status, setStatus] = useState(false);
  const [tag, setTag] = useState("");

  const average = (grades) => {
    let sum = 0;
    for (let i = 0; i < grades.length; i++) {
      sum += parseFloat(grades[i]);
    }
    return sum / grades.length;
  };

  const  onKeyUp = (e) => {
    if(e.keyCode === 13){
        setTag('');
        onTagReceived({value: tag, id: item.id})
    }
  }


  return (
    <div className="user" role="user">
      <div className="row">
        <div className="col-md-2">
          <img className="img" alt={item.pic} src={item.pic} />
        </div>
        <div className="col-md-8">
          <h2>
            {item.firstName} {item.lastName}
          </h2>
          <div>Email: {item.email}</div>
          <div>Company: {item.company}</div>
          <div>Skill: {item.skill}</div>
          <div>Average: {average(item.grades)}%</div>
        </div>
        <div className="col-md-2 show" onClick={() => setStatus(!status)}>
          {status ? "-" : "+"}
        </div>
      </div>

      <div className="row">
        {status ? (
          <div className="col-md-8 col-md-offset-2" style={{ marginTop: 20 }}>
            {item.grades.map((grade, index) => (
              <div key={index}>
                <span>Test {index + 1}:</span>{" "}
                <span style={{ marginLeft: 20 }}>{grade}%</span>
              </div>
            ))}
            {item.tags ? item.tags.map(t => (
            <span className="tag">
                <button className="btn btn-xs">
                    {t}
                </button>
            </span>)) : null}
            <div>
              <input
                type="text"
                id="search"
                value={tag}
                onKeyUp={onKeyUp}
                onChange={(e) => setTag(e.target.value)}
                style={{ position: "inline" }}
                placeholder="Search by name"
              />
            </div>
            
          </div>
        ) : null}
      </div>
    </div>
  );
}
