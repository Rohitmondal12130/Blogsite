import React from "react";

const About = () => (
  <div  className="container ">
      <br></br>

  <center>
   <h1 className="title"><i>About Us</i></h1>
 </center><br/><div className="row"><div className="col-6">

 
   <div className="my-3">
     <img
       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7863y5DnpmL2kozb7RT-HbnGobvHDkVr6tw&s"
       alt="About Us"
       className="img-fluid w-100 "
     />
   </div>
 </div>
 <div className="col-6">
 <div className="con-cont p-3">
   <p>BlogApp is a platform dedicated to sharing insightful and engaging content on a variety of topics including technology, lifestyle, and personal development. Our goal is to provide our readers with valuable information and perspectives that inspire and inform..</p>
  
   <section>
      <h2>Our Mission</h2>
      <p>
        Our mission is to create a community where knowledge is shared and ideas are exchanged. We believe in the power of storytelling and aim to connect with our readers through meaningful content that resonates and sparks curiosity.
      </p>
    </section>
   <div className="d-flex ">
   <div class="col-md-6">
              <div class="card bg-primary text-white">
                
                  <center><h5 class="card-title">Bloggers</h5></center>
                  <center><p class="text">50+</p></center>
               
              </div>
            </div>

           
            <div class="col-md-6">
              <div class="card bg-success text-white">
               
                  <center><h5 class="card-title">Quality blogs</h5></center>
                 <center> <p class="text">200+</p></center>
                
              </div>
            </div>
     
   </div>
   
 </div></div></div>
</div>
);

export default About;
