

export default async function fetchStudentData(){
    return fetch(process.env.REACT_APP_API_URL);
}
