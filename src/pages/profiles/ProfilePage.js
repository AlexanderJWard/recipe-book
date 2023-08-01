import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import Loading from "../../components/Loading";

import styles from "../../styles/ProfilePage.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Card, Image } from "react-bootstrap";
import Post from "../posts/Post";
import Todo from "../todo/Todo";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const [profileTodo, setProfileTodo] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: pageProfile },
          { data: profilePosts },
          { data: profileTodo },
        ] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/posts/?owner__profile=${id}`),
          axiosReq.get(`/todo/?owner__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setProfileTodo(profileTodo);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button onClick={() => {}}>unfollow</Button>
            ) : (
              <Button onClick={() => {}}>follow</Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfileTodo = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s tasks</p>
      <hr />
      {is_owner && <Card.Title><Link to={`/todo/create`}>Create a new task</Link></Card.Title>}
      {profileTodo.results.length ? (
        <InfiniteScroll
          children={profileTodo.results.map((todo) => (
            <Todo key={todo.id} {...todo} setTodo={setProfileTodo} />
          ))}
          dataLength={profileTodo.results.length}
          loader={<Loading spinner />}
          hasMore={!!profileTodo.next}
          next={() => fetchMoreData(profileTodo, setProfileTodo)}
        />
      ) : (
        <Loading
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't added any tasks.`}
        />
      )}
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Loading spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Loading
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileTodo}
              {mainProfilePosts}
            </>
          ) : (
            <Loading spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
