import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMostPopularPodcast } from '../api/index';
import { getPodcastByCategory } from '../api';
import { PodcastCard } from '../components/PodcastCard.jsx'
import { getUsers } from '../api/index';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const DashboardMain = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ box, theme }) => box && `
    background-color: ${theme.bg};
    border-radius: 10px;
    padding: 20px 30px;
  `}
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Span = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  &:hover {
    transition: 0.2s ease-in-out;
  }
`;

const Podcasts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 18px 6px;
  @media (max-width: 550px) {
    justify-content: center;
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const DisplayNo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.text_primary};
`;

const Dashboard = ({ setSignInOpen }) => {
  const [mostPopular, setMostPopular] = useState([]);
  const [user, setUser] = useState();
  const [comedy, setComedy] = useState([]);
  const [news, setNews] = useState([]);
  const [sports, setsports] = useState([]);
  const [crime, setCrime] = useState([]);
  const [loading, setLoading] = useState(false);

  // User
  const { currentUser } = useSelector(state => state.user);

  const token = localStorage.getItem("podstreamtoken");
  const getUser = async () => {
    await getUsers(token)
      .then((res) => setUser(res.data))
      .catch((error) => console.log(error));
  };

  const getPopularPodcast = async () => {
    await getMostPopularPodcast()
      .then((res) => setMostPopular(res.data))
      .catch((error) => console.log(error));
  };

  const getCommedyPodcasts = async () => {
    getPodcastByCategory("comedy")
      .then((res) => setComedy(res.data))
      .catch((error) => console.log(error));
  };

  const getNewsPodcasts = async () => {
    getPodcastByCategory("news")
      .then((res) => setNews(res.data))
      .catch((error) => console.log(error));
  };

  const getSportsPodcasts = async () => {
    getPodcastByCategory("sports")
      .then((res) => setsports(res.data))
      .catch((error) => console.log(error));
  };

  const getCrimePodcasts = async () => {
    getPodcastByCategory("crime")
      .then((res) => setCrime(res.data))
      .catch((error) => console.log(error));
  };

  const getallData = async () => {
    setLoading(true);
    if (currentUser) {
      await getUser();
    }
    await getPopularPodcast();
    await getCommedyPodcasts();
    await getNewsPodcasts();
    await getCrimePodcasts();
    await getSportsPodcasts();
    setLoading(false);
  };

  useEffect(() => {
    getallData();
  }, [currentUser]);

  return (
    <DashboardMain>
      {loading ? (
        <Loader>
          <CircularProgress />
        </Loader>
      ) : (
        <>
          {currentUser && user?.podcasts?.length > 0 && (
            <FilterContainer box={true}>
              <Topic>
                Your Uploads
                <Link to={`/profile`} style={{ textDecoration: "none" }}>
                  <Span>Show All</Span>
                </Link>
              </Topic>
              <Podcasts>
                {user?.podcasts.slice(0, 10).map((podcast) => (
                  <PodcastCard key={podcast._id} podcast={podcast} user={user} setSignInOpen={setSignInOpen} />
                ))}
              </Podcasts>
            </FilterContainer>
          )}
          <FilterContainer>
            <Topic>
              Most Popular
              <Link to={`/showpodcasts/mostpopular`} style={{ textDecoration: "none" }}>
                <Span>Show All</Span>
              </Link>
            </Topic>
            <Podcasts>
              {mostPopular.slice(0, 10).map((podcast) => (
                <PodcastCard key={podcast._id} podcast={podcast} user={user} setSignInOpen={setSignInOpen} />
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Topic>
              Comedy
              <Link to={`/showpodcasts/comedy`} style={{ textDecoration: "none" }}>
                <Span>Show All</Span>
              </Link>
            </Topic>
            <Podcasts>
              {comedy.slice(0, 10).map((podcast) => (
                <PodcastCard key={podcast._id} podcast={podcast} user={user} setSignInOpen={setSignInOpen} />
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Topic>
              News
              <Link to={`/showpodcasts/news`} style={{ textDecoration: "none" }}>
                <Span>Show All</Span>
              </Link>
            </Topic>
            <Podcasts>
              {news.slice(0, 10).map((podcast) => (
                <PodcastCard key={podcast._id} podcast={podcast} user={user} setSignInOpen={setSignInOpen} />
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Topic>
              Crime
              <Link to={`/showpodcasts/crime`} style={{ textDecoration: "none" }}>
                <Span>Show All</Span>
              </Link>
            </Topic>
            <Podcasts>
              {crime.slice(0, 10).map((podcast) => (
                <PodcastCard key={podcast._id} podcast={podcast} user={user} setSignInOpen={setSignInOpen} />
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Topic>
              Sports
              <Link to={`/showpodcasts/sports`} style={{ textDecoration: "none" }}>
                <Span>Show All</Span>
              </Link>
            </Topic>
            <Podcasts>
              {sports.slice(0, 10).map((podcast) => (
                <PodcastCard key={podcast._id} podcast={podcast} user={user} setSignInOpen={setSignInOpen} />
              ))}
            </Podcasts>
          </FilterContainer>
        </>
      )}
    </DashboardMain>
  );
}

export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import styled from "styled-components";
// import {
//   getMostPopularPodcast,
//   getPodcastByCategory,
//   getUsers,
// } from "../api/index";
// import PodcastCard from "../components/PodcastCard.jsx";
// import { Link } from "react-router-dom";
// import { CircularProgress } from "@mui/material";

// const DashboardMain = styled.div`
//   padding: 20px 30px;
//   padding-bottom: 200px;
//   height: 100%;
//   overflow-y: scroll;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   @media (max-width: 768px) {
//     padding: 6px 10px;
//   }
// `;

// const FilterContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   ${({ box, theme }) =>
//     box &&
//     `
//     background-color: ${theme.bg};
//     border-radius: 10px;
//     padding: 20px 30px;
//   `}
//   background-color: ${({ theme }) => theme.bg};
//   border-radius: 10px;
//   padding: 20px 30px;
// `;

// const Topic = styled.div`
//   color: ${({ theme }) => theme.text_primary};
//   font-size: 24px;
//   font-weight: 540;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   @media (max-width: 768px) {
//     font-size: 18px;
//   }
// `;

// const Span = styled.span`
//   color: ${({ theme }) => theme.text_secondary};
//   font-size: 16px;
//   font-weight: 400;
//   cursor: pointer;
//   @media (max-width: 768px) {
//     font-size: 14px;
//   }
//   color: ${({ theme }) => theme.primary};
//   &:hover {
//     transition: 0.2s ease-in-out;
//   }
// `;

// const Podcasts = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 14px;
//   padding: 18px 6px;
//   @media (max-width: 550px) {
//     justify-content: center;
//   }
// `;

// const Loader = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   width: 100%;
// `;

// const DisplayNo = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   width: 100%;
//   color: ${({ theme }) => theme.text_primary};
// `;

// const Dashboard = ({ setSignInOpen }) => {
//   const [mostPopular, setMostPopular] = useState([]);
//   const [user, setUser] = useState();
//   const [comedy, setComedy] = useState([]);
//   const [news, setNews] = useState([]);
//   const [sports, setSports] = useState([]);
//   const [crime, setCrime] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const { currentUser } = useSelector((state) => state.user);
//   const token = localStorage.getItem("podstreamtoken");

//   const getUser = async () => {
//     try {
//       const res = await getUsers(token);
//       setUser(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getPopularPodcast = async () => {
//     try {
//       const res = await getMostPopularPodcast();
//       setMostPopular(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getComedyPodcasts = async () => {
//     try {
//       const res = await getPodcastByCategory("comedy");
//       setComedy(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getNewsPodcasts = async () => {
//     try {
//       const res = await getPodcastByCategory("news");
//       setNews(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getSportsPodcasts = async () => {
//     try {
//       const res = await getPodcastByCategory("sports");
//       setSports(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getCrimePodcasts = async () => {
//     try {
//       const res = await getPodcastByCategory("crime");
//       setCrime(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getAllData = async () => {
//     setLoading(true);
//     if (currentUser) {
//       await getUser();
//     }
//     await getPopularPodcast();
//     await getComedyPodcasts();
//     await getNewsPodcasts();
//     await getCrimePodcasts();
//     await getSportsPodcasts();
//     setLoading(false);
//   };

//   useEffect(() => {
//     getAllData();
//   }, [currentUser]);

//   return (
//     <DashboardMain>
//       {loading ? (
//         <Loader>
//           <CircularProgress />
//         </Loader>
//       ) : (
//         <>
//           {currentUser && user?.podcasts?.length > 0 && (
//             <FilterContainer box={true}>
//               <Topic>
//                 Your Uploads
//                 <Link to={`/profile`} style={{ textDecoration: "none" }}>
//                   <Span>Show All</Span>
//                 </Link>
//               </Topic>
//               <Podcasts>
//                 {user.podcasts.slice(0, 10).map((podcast) => (
//                   <PodcastCard
//                     key={podcast._id}
//                     podcast={podcast}
//                     user={user}
//                     setSignInOpen={setSignInOpen}
//                   />
//                 ))}
//               </Podcasts>
//             </FilterContainer>
//           )}

//           <FilterContainer>
//             <Topic>
//               Most Popular
//               <Link
//                 to={`/showpodcasts/mostpopular`}
//                 style={{ textDecoration: "none" }}
//               >
//                 <Span>Show All</Span>
//               </Link>
//             </Topic>
//             <Podcasts>
//               {mostPopular.slice(0, 10).map((podcast) => (
//                 <PodcastCard
//                   key={podcast._id}
//                   podcast={podcast}
//                   user={user}
//                   setSignInOpen={setSignInOpen}
//                 />
//               ))}
//             </Podcasts>
//           </FilterContainer>

//           <FilterContainer>
//             <Topic>
//               Comedy
//               <Link
//                 to={`/showpodcasts/comedy`}
//                 style={{ textDecoration: "none" }}
//               >
//                 <Span>Show All</Span>
//               </Link>
//             </Topic>
//             <Podcasts>
//               {comedy.slice(0, 10).map((podcast) => (
//                 <PodcastCard
//                   key={podcast._id}
//                   podcast={podcast}
//                   user={user}
//                   setSignInOpen={setSignInOpen}
//                 />
//               ))}
//             </Podcasts>
//           </FilterContainer>

//           <FilterContainer>
//             <Link to={`/showpodcasts/news`} style={{ textDecoration: "none" }}>
//               <Topic>
//                 News
//                 <Span>Show All</Span>
//               </Topic>
//             </Link>
//             <Podcasts>
//               {news.slice(0, 10).map((podcast) => (
//                 <PodcastCard
//                   key={podcast._id}
//                   podcast={podcast}
//                   user={user}
//                   setSignInOpen={setSignInOpen}
//                 />
//               ))}
//             </Podcasts>
//           </FilterContainer>

//           <FilterContainer>
//             <Link to={`/showpodcasts/crime`} style={{ textDecoration: "none" }}>
//               <Topic>
//                 Crime
//                 <Span>Show All</Span>
//               </Topic>
//             </Link>
//             <Podcasts>
//               {crime.slice(0, 10).map((podcast) => (
//                 <PodcastCard
//                   key={podcast._id}
//                   podcast={podcast}
//                   user={user}
//                   setSignInOpen={setSignInOpen}
//                 />
//               ))}
//             </Podcasts>
//           </FilterContainer>

//           <FilterContainer>
//             <Link
//               to={`/showpodcasts/sports`}
//               style={{ textDecoration: "none" }}
//             >
//               <Topic>
//                 Sports
//                 <Span>Show All</Span>
//               </Topic>
//             </Link>
//             <Podcasts>
//               {sports.slice(0, 10).map((podcast) => (
//                 <PodcastCard
//                   key={podcast._id}
//                   podcast={podcast}
//                   user={user}
//                   setSignInOpen={setSignInOpen}
//                 />
//               ))}
//             </Podcasts>
//           </FilterContainer>
//         </>
//       )}
//     </DashboardMain>
//   );
// };

// export default Dashboard;
