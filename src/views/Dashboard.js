import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import { getPostsParam } from '../firebase/routes'

function Dashboard() {
    const [posts, setPosts] = useState(null)
    
    const nav = useNavigate();

    const test = async () => {
        // console.log()
        let t = await getPostsParam("location", "data")
            .then(ok => {
                console.log(ok);

                setPosts(ok)
            })
        console.log(t)
    }


    useEffect(() => {
        console.log("state: ", posts, typeof (posts));
        console.log(posts)

    }, [posts])
    useEffect(() => {
        test()

    }, [])


    return (
        <div>Dashboard -
            <h2>This is the dashboard</h2>
            <br />
            <Link to="/listing/create" >
                <h3>Create Listing</h3>
            </Link>
            {/* <Categories /> */}
            <br />
            {
                posts ?
                    // <p>{JSON.stringify(posts[0])}</p>
                 posts.map((dd, k) => { //this needs to a <Link> in final copy 
                    return <div>
                        {
                            dd.image.length > 0  ? 
                            dd.image.map((img, i) =>{
                                return <div><img key={i} src={img} alt="listing Image"/> {i} - {img} </div>
                            })
                            : null
                        }
                        <Link 
                            to={"/listing/update/" + dd.id} key={k}>{dd.title} - {dd.id} 
                        </Link> 
                        - - - 
                        <button 
                            onClick={() => nav(`/listing/remove/${dd.id}`)}
                            > DESTROY LISTING  
                        </button>
                    </div>
                })
            :  <p>No Post data yet.</p>
                
            }

        </div>
    )
}

export default Dashboard