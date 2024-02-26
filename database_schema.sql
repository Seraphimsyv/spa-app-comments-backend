--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5 (Debian 15.5-0+deb12u1)
-- Dumped by pg_dump version 15.5 (Debian 15.5-0+deb12u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    id integer NOT NULL,
    "authorId" integer,
    text text NOT NULL,
    "parentId" integer,
    "anonymAuthor" json,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "fileId" integer
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_id_seq OWNER TO postgres;

--
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_id_seq OWNED BY public.comment.id;


--
-- Name: file; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.file (
    id integer NOT NULL,
    filename text NOT NULL,
    filepath text NOT NULL,
    "uploadAt" time with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.file OWNER TO postgres;

--
-- Name: file_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.file_id_seq OWNER TO postgres;

--
-- Name: file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.file_id_seq OWNED BY public.file.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    "homePage" text,
    password text NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: comment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN id SET DEFAULT nextval('public.comment_id_seq'::regclass);


--
-- Name: file id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file ALTER COLUMN id SET DEFAULT nextval('public.file_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (id, "authorId", text, "parentId", "anonymAuthor", "createdAt", "fileId") FROM stdin;
241	\N	Test comment text	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 19:12:12.768349+02	8
242	\N	Test comment text	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 19:16:57.393212+02	9
243	\N	Test comment text	242	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 19:18:06.334256+02	10
244	11	Test websocket create comment	\N	\N	2024-02-24 19:26:56.583564+02	11
245	\N	Test comment text	242	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:04:48.450473+02	\N
246	\N	Test comment text	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:05:09.289463+02	\N
247	\N	Test comment text	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:05.175395+02	\N
248	\N	Test comment text 1	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:11.072109+02	\N
249	\N	Test comment text 2	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:13.720121+02	\N
250	\N	Test comment text 3	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:16.367918+02	\N
251	\N	Test comment text 4	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:19.214474+02	\N
252	\N	Test comment text 5	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:21.805313+02	\N
253	\N	Test comment text 6	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:24.760949+02	\N
254	\N	Test comment text 7	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:27.40306+02	\N
255	\N	Test comment text 8	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:30.523783+02	\N
256	\N	Test comment text 9	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:34.595485+02	\N
257	\N	Test comment text 10	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:39.390853+02	\N
258	\N	Test comment text 11	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:43.28174+02	\N
259	\N	Test comment text 12	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:47.255716+02	\N
260	\N	Test comment text 13	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:49.876782+02	\N
261	\N	Test comment text 14	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:52.608186+02	\N
262	\N	Test comment text 15	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:17:59.152615+02	\N
263	\N	Test comment text 16	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:18:02.272749+02	\N
264	\N	Test comment text 17	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:18:05.569787+02	\N
265	\N	Test comment text 18	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:18:08.56579+02	\N
266	\N	Test comment text 19	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:18:12.475348+02	\N
267	\N	Test comment text 20	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:18:15.855723+02	\N
268	\N	Test comment text 20	\N	{"username":"Tese","email":"test@gmail.com"}	2024-02-24 20:18:38.314822+02	\N
269	11	Test websocket create comment	\N	\N	2024-02-26 13:31:10.993783+02	12
270	11	test	269	\N	2024-02-26 13:40:44.990784+02	13
271	14	Hello	270	\N	2024-02-26 13:47:23.318762+02	\N
272	14	Hello	\N	\N	2024-02-26 13:48:05.506318+02	\N
273	14	Hello, World!	\N	\N	2024-02-26 13:49:36.311106+02	14
274	14	Test	\N	\N	2024-02-26 14:23:17.656333+02	\N
275	14	Tester	\N	\N	2024-02-26 14:24:00.544236+02	\N
276	\N	Hello alf	\N	{"username":"Alf","email":"alf@gmail.com","homePage":"alf.com"}	2024-02-26 14:34:05.337675+02	\N
\.


--
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.file (id, filename, filepath, "uploadAt") FROM stdin;
8	test.jpg	./uploads/images/961966875.jpg	19:12:12.734313+02
9	test.jpg	./uploads/images/648800934.jpg	19:16:57.1486+02
10	test.jpg	./uploads/images/769150173.jpg	19:18:06.288789+02
11	package.txt	./uploads/text/849907829.txt	19:26:56.52549+02
12	package.txt	./uploads/text/205000725.txt	13:31:10.927816+02
13	test.jpg	./uploads/images/561923603.jpg	13:40:44.908031+02
14	test.jpg	./uploads/images/324102858.jpg	13:49:36.092444+02
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, email, "homePage", password) FROM stdin;
11	tester	oshinokelen@gmail.com	\N	$2b$10$J7LjKdr5p1bXoujX49NJbOHsm7jUX2MFrZT/QUhKgxPTydwWVHrbe
12	tester2	test@gmail.com	\N	$2b$10$cyeXmJkR3xHGocrS4tl1Rex2Laerjsr58P7P6UB4ofnhCdIJlMDIa
13	Testet	test@gmasil.com	\N	$2b$10$dqir3hxE86nY1M8vietkCOfOtTyjqUto3417vvjK3cZSpOetM491.
14	sera	sera@gmail.com	sera.com	$2b$10$RaGHWT4avKPpBbUZuKQBguWN0Wlo/5iprtnSas3j/zRS1Ivr9tlMe
\.


--
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_id_seq', 276, true);


--
-- Name: file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.file_id_seq', 14, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 14, true);


--
-- Name: comment PK_0b0e4bbc8415ec426f87f3a88e2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY (id);


--
-- Name: file PK_36b46d232307066b3a2c9ea3a1d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: file UQ_2654a4141b4002f8d23e249f687; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT "UQ_2654a4141b4002f8d23e249f687" UNIQUE (filepath);


--
-- Name: comment UQ_debfbd25253e96448d9e4a811b3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "UQ_debfbd25253e96448d9e4a811b3" UNIQUE ("fileId");


--
-- Name: comment FK_276779da446413a0d79598d4fbd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES public."user"(id);


--
-- Name: comment FK_debfbd25253e96448d9e4a811b3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_debfbd25253e96448d9e4a811b3" FOREIGN KEY ("fileId") REFERENCES public.file(id);


--
-- Name: comment FK_e3aebe2bd1c53467a07109be596; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_e3aebe2bd1c53467a07109be596" FOREIGN KEY ("parentId") REFERENCES public.comment(id);


--
-- PostgreSQL database dump complete
--

