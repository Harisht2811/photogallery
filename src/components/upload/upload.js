import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../register/userAuthContext';
import './upload.css';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "./uploadImagesFirebase";
import {auth, db} from "../register/registerAuthentication";
import { addDoc, collection, doc, Firestore, getDocs, getFirestore, setDoc, getDoc, arrayUnion,updateDoc } from 'firebase/firestore';







function Upload() {
    const navigate = useNavigate();
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [userImage, setUserImage] = useState([]);
    const [searchItem,setSearchItem] = useState([]);
    const [searchFromDate,setSearchFromDate] = useState([]);
    const [searchToDate,setSearchToDate] = useState([]);
    const [loading,setLoading] = useState("");


    const imageListRef = ref(storage, "images/");
    // console.log(imageListRef);
    let email = auth.currentUser.email;
    // const usersCollectionRef = collection(db, "user_images");
    const uploadImages =() => {
        if (imageUpload == null) return;
            
            const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
            const date = new Date().toISOString().substring(0,10);

            uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageList((prev) => [...prev, url]);
                    console.log(db, auth.currentUser.email)
                    updateDataTable();
                    let data={
                        url:url,
                        fileName:imageUpload.name,
                        uploadedDate:date,
                    }
                    updateDoc(doc(db, "user_images", email), {
                         
                                userImageDetails:arrayUnion(data)
                                
                        
                       });  


            })
        })


    };
 
    useEffect(() => {
        updateDataTable();
        setLoading(false);
        localStorage.setItem("email", JSON.stringify(auth.currentUser.email));
      }, []);

    const updateDataTable = async () => {
        let docref = doc(db, 'user_images', email);
        console.log(docref);
        let sp = await getDoc(docref);
        console.log(sp)
                    let data = sp.data();
                    console.log(data)

                    if(data === undefined){
                        setDoc(doc(db, "user_images", email), {
                        
                       }); 
                    }
                    setUserImage(data.userImageDetails)
                  
    };
    const getFilterData=()=>{
        console.log("inside get filter data",searchFromDate,searchToDate,searchItem);
        if ((searchFromDate && searchToDate) !=0  && (searchItem.length >0))
        {
            return userImage.filter (obj => 
                obj.uploadedDate >= searchFromDate && obj.uploadedDate <= searchToDate && obj.fileName.toLowerCase().includes(searchItem.toLowerCase()));
        }
        else if ((searchFromDate && searchToDate) !=0 ) {
                console.log("inside get filter data if",userImage);
            //return userImage.filter(
                
            //   return userImage.filter (obj => obj.uploadedDate >= searchFromDate && obj.uploadedDate <= searchToDate)
             return userImage.filter (obj => 
                obj.uploadedDate >= searchFromDate && obj.uploadedDate <= searchToDate
              //obj => obj.fileName.toLowerCase().includes(searchItem.toLowerCase());
                           
            )
          }
          else if (searchItem.length >0){
            return userImage.filter(
                obj => obj.fileName.toLowerCase().includes(searchItem.toLowerCase())
             )
          }
    return userImage;


    }
    
    // const getFilterData=()=>{
    //      if(searchItem.length>0){
    //          return userImage.filter(
    //             obj => obj.fileName.toLowerCase().includes(searchItem.toLowerCase())
    //          )
    //      }
    //     return userImage;
    // }

    function logOut() {
        navigate('/login');
    }

    return (
        <>
            <section>
                <div className='Images'>
                    <nav class="navbar navbar-light bg-pink">
                        <h1>Photo Gallery</h1>
                        <div className='nav-link nav-button'>
                            <div >
                                <button type="button" class="btn btn-text btn-md" onClick={logOut}><i class="fa fa-sign-out ml-1"></i>Logout</button>
                            </div>
                            <button type="button" onClick={() => {
                                navigate('/')
                            }} class="btn btn-text btn-md"><i class="fa fa-sign-in ml-1"></i> Sign In</button>
                          

                        </div>

                    </nav>

                    <div className='uploadImages'>
                        <h1>Upload and Share Your Images.</h1>
                        <input type="file" onChange={(event) => { setImageUpload(event.target.files[0]) }}></input>
                        <button type="file" onClick={uploadImages} class="btn btn-info btn-lg"> Upload</button>
                        <p>Start uploading here</p>
                        <div className='filterImages'>
                          From Date: <input type="date" dateFormat onChange={e=>setSearchFromDate(e.target.value)}  ></input>
                          To Date:   <input type="date" onChange={e=>setSearchToDate(e.target.value)}></input>
                          File Name:  <input type="text" onChange={e => setSearchItem(e.target.value)} ></input>

                        </div>
                    </div>
         
                    <div className='images'>
                      
                        <div className='conatiner-md border'>
                            <div className=' row row-cols-1 row-cols-sm-2 row-cols-md-5'>
                                {getFilterData().map(obj => {
                                    return <img className='uploadedImages'  src={obj.url} alt="userImages" />;
                                })}
                             
                                
                            </div>
                        </div>
                        <div>{searchFromDate}</div>
                        <div>{searchToDate}</div>



                    </div>
                </div>
            </section>



        </>
    )
}

export default Upload;



















