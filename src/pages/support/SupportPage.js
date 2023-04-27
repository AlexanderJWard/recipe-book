import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Col, Container, Form, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Loading from "../../components/Loading";
import Support from "./Support";
import NoResults from "../../assets/no-results.png";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const SupportPage = ({ message, filter = "" }) => {
  const [tickets, setTickets] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await axiosReq.get(
          `/support_tickets/?${filter}search=${query}`
        );
        setTickets(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err)
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchTickets();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, currentUser, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Form onSubmit={(event) => event.preventDefault()}>
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search Tickets"
          />
        </Form>
        {hasLoaded ? (
          <>
            {tickets.results.length ? (
              <InfiniteScroll
                children={tickets.results.map((ticket) => (
                  <Support
                    key={ticket.id}
                    {...ticket}
                    setTickets={setTickets}
                  />
                ))}
                dataLength={tickets.results.length}
                loader={<Loading spinner />}
                hasMore={!!tickets.next}
                next={() => fetchMoreData(tickets, setTickets)}
              />
            ) : (
              <Container>
                <Loading src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container>
            <Loading spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
};

export default SupportPage;
