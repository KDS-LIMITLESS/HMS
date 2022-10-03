--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-1.pgdg18.04+1)

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
-- Name: credit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credit (
    id integer NOT NULL,
    opening_credit integer DEFAULT 0,
    credit_granted integer DEFAULT 0,
    credit_remaining integer DEFAULT 0,
    username character varying
);


ALTER TABLE public.credit OWNER TO postgres;

--
-- Name: credit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credit_id_seq OWNER TO postgres;

--
-- Name: credit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credit_id_seq OWNED BY public.credit.id;


--
-- Name: item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item (
    department character varying NOT NULL,
    product character varying NOT NULL,
    price integer NOT NULL,
    category character varying NOT NULL,
    image character varying NOT NULL
);


ALTER TABLE public.item OWNER TO postgres;

--
-- Name: notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification (
    id bigint NOT NULL,
    waiter character varying,
    item character varying NOT NULL,
    quantity integer NOT NULL,
    status character varying DEFAULT 'UNREAD'::character varying
);


ALTER TABLE public.notification OWNER TO postgres;

--
-- Name: notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notification_id_seq OWNER TO postgres;

--
-- Name: notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notification_id_seq OWNED BY public.notification.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id bigint NOT NULL,
    username character varying,
    item character varying NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL,
    category character varying NOT NULL,
    image character varying NOT NULL,
    department character varying NOT NULL,
    table_name character varying NOT NULL,
    "time" character varying
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: tables; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tables (
    table_name character varying NOT NULL,
    waiter character varying,
    status character varying DEFAULT 'OPEN'::character varying NOT NULL,
    cash integer DEFAULT 0,
    pos integer DEFAULT 0,
    transfer integer DEFAULT 0,
    credit integer DEFAULT 0,
    total integer DEFAULT 0 NOT NULL,
    discount integer DEFAULT 0,
    complimentary_drink character varying DEFAULT ' '::character varying,
    complimentary_qty integer DEFAULT 0,
    date character varying,
    "time" character varying
);


ALTER TABLE public.tables OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    username character varying NOT NULL,
    password character varying NOT NULL,
    role character varying NOT NULL,
    passcode integer NOT NULL,
    status character varying DEFAULT 'ACTIVE'::character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: credit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit ALTER COLUMN id SET DEFAULT nextval('public.credit_id_seq'::regclass);


--
-- Name: notification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification ALTER COLUMN id SET DEFAULT nextval('public.notification_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Data for Name: credit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credit (id, opening_credit, credit_granted, credit_remaining, username) FROM stdin;
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item (department, product, price, category, image) FROM stdin;
Bar	Plantain	500	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/plantain%20-1662560515397.jpg
Lounge	Guinness mid stout	800	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-mid-stout-1661939341052.jpg
Lounge	Guinness extra smooth	800	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-mid-stout-1661939341052.jpg
Lounge	Origin bitters	1000	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/origin-bitters-1661939472811.png
Lounge	Budwiser	1000	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661939497449.jfif
Lounge	Kolaq bitters	1000	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/kolaq-bitters-1661939527239.png
Lounge	Confam bitters	600	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/confam-bitters-1661939585375.jpg
Lounge	Big stout	1000	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/big-stout-1661939598708.jfif
Lounge	Big smirnoff ice	1000	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/big-smirnoff-ice-1661939649538.jfif
Lounge	Nines Herbal	1500	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/nines-herbal-1661939658002.png
Lounge	Desperados	800	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661939698674.jfif
Lounge	Gold berg	800	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/goldberg-1661939702281.jpg
Lounge	Origin	800	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/orijin-1661939729948.jfif
Lounge	Star Radler	600	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661939757152.jpg
Lounge	Smirnoff ice	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnoff-ice-1661939768505.jfif
Lounge	Legend mid stout	600	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/tiger-beer-1661939791348.jpg
Lounge	Guinness gold	800	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-gold-1661939811520.jfif
Lounge	Star	800	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-1661939882022.jfif
Lounge	Small legend stout	500	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/small-legend-stout-1661939903269.png
Lounge	Life	800	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/life-1661939926602.jfif
Lounge	Heineken	1000	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif
Lounge	Hero	800	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661939968376.jfif
Lounge	33 export	800	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/33-export-1661940008575.jfif
Bar	Chicken and Chips	4000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/chicken%20%26%20chips-1661950246165.jpg
Lounge	Gulder	800	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/gulder-1661940036481.jfif
Bar	Peppered Beef	3000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/peppered%20gizzard-1661950321905.jpg
Lounge	Legend big stout	1000	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/legend-big-stout-1661940086906.jfif
Lounge	Amstel	600	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/amstel-bottle-1661940544510.jpg
Lounge	Maltina	600	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/maltina-1661940578688.jpg
Lounge	Fayrouz	600	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg
Lounge	Coke	500	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/coke-1661940634405.jpg
Lounge	Fanta	500	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fanta-1661940654946.jpg
Lounge	Sprite	500	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/sprite-1661940678309.jpg
Lounge	Chi Active Can	500	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/chi-active-can-1661940748928.jpg
Lounge	Bottled Water	300	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg
Lounge	Cranberry	3000	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/cranberry-1661941305398.jfif
Lounge	Chivita juice	2000	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/chivita-juice-1661941504542.jfif
Lounge	Exotic juice	2000	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/exotic-juice-1661941551807.jfif
Lounge	Big Farm pride	800	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/big-farm-pride-1661941631145.jfif
Lounge	Hollandia	2000	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/hollandia-1661941696663.jfif
Lounge	Tito 1 litre	1500	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/tito-1litre-1661941752437.jfif
Lounge	Tito 500ML	1000	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/tito-500ml-1661941776368.jfif
Lounge	Cedaa yoghurt	800	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/cedaa-yoghurt-1661941918222.jfif
Lounge	Bullet vodka	1500	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/bullet-vodka-1661941966954.jfif
Lounge	Red bull	1000	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/red-bull-1661941993835.jfif
Lounge	Power horse	1000	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/power-horse-1661942039910.jfif
Lounge	Monster	1000	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/monster-1661942076908.jfif
Lounge	Climax pet	1000	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/climax-pet-1661942123203.jfif
Lounge	Climax can	1000	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/climax-can-1661942183141.jfif
Bar	Peppered Chicken Wings	2500	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/peppered%20chicken%20wings-1661950474315.JPG
Bar	Noodles & Egg	1200	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Noodles%20and%20egg-1661950622402.jpg
Bar	Take Away Pack	200	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Take%20away%20packs-1661950810184.jpeg
Bar	Garden Salad	3500	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/garden%20salad-1661950910079.jpg
Bar	Nsala Soup with Swallow	3000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Nsala-Soup-1661950994722.jpg
Bar	Tequila Shots	1500	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/tequila-shots-1661948976642.jpg
Bar	Plantain and Egg Sause	1700	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/plantain%20and%20egg%20sause-1662560554516.jpg
Bar	Goat Head (Isi Ewu)	4500	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Isi-Ewu-1661950057976.jpg
Bar	Amstel	500	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/amstel-bottle-1661950064604.jpg
Bar	Peppered Chicken 	3000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/peppered%20chicken-1661950282912.jpeg
Bar	Guinness mid-stout	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-mid-stout-1661947241628.jpg
Bar	Maltina	500	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/maltina-1661950378810.jpg
Bar	Special Sharwama	2000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Special%20Sharwama-1661950526801.jpg
Bar	Guinness extra smooth	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-mid-stout-1661947241628.jpg
Bar	Origin Bitters	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/origin-bitters-1661947304167.png
Bar	Budwiser	800	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif
Bar	Big Stout	800	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661947312454.jfif
Bar	Kolaq Bitters	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/kolaq-bitters-1661947341632.png
Bar	Big Smirnoff Ice	1000	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/big-smirnoff-ice-1661947372267.jfif
Bar	Confam Bitters	500	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/confam-bitters-1661947377963.jpg
Bar	Desperados	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661947395009.jfif
Bar	Nines Herbal	1500	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/confam-bitters-1661947377963.jpg
Bar	Orijin	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/orijin-1661947441277.jfif
Bar	Gold Berg	400	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/goldberg-1661947471356.jpg
Bar	Star Radler	500	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661947532264.jpg
Bar	Guinness Gold	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-gold-1661947549953.jfif
Bar	Star	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-gold-1661947549953.jfif
Bar	Legend mid stout	500	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/legend-mid-stout-1661947607862.png
Bar	Life	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/life-1661947614006.jfif
Bar	Hero	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif
Bar	Coleslaw	500	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Coleslaw-1662560604036.jpeg
Bar	33 Export	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif
Bar	Small Legend Stout	400	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/small-legend-stout-1661947735560.png
Bar	Gulder	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/gulder-1661947739194.jfif
Bar	Legend Big Stout	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/legend-big-stout-1661947771133.jfif
Bar	Medium Farm pride	500	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/medium-farm-pride-1661947868727.jpg
Bar	Cranberry	3000	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/cranberry-1661947896297.jfif
Bar	Chivita Juice	1500	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/chivita-juice-1661947957172.jfif
Bar	Exotic Juice	1500	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/exotic-juice-1661948406442.jfif
Bar	Big Farm Pride	700	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/big-farm-pride-1661948453028.jfif
Bar	Heineken	1000	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif
Bar	Hollandia	1500	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/big-farm-pride-1661948453028.jfif
Lounge	Tiger	700	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/Tiger-1662488462538.jpeg
Bar	Tito 500ML	900	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/tito-500ml-1661948787735.jfif
Bar	Tito 330ML	450	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/tito-330ml-1661948826486.jfif
Lounge	Laurent perrier demi sec	35000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/laurent-perrier-demi-sec%20jfif-1661942499921.jfif
Bar	Peppered Snail	3500	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Snail-1661950101552.jpg
Bar	Peppered Goat Meat	3000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg
Bar	Goat Meat Pepper Soup	3000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/goat%20meat%20pepper%20soup-1661950398879.jpeg
Bar	Beef/Chicken Sharwama	1500	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Beef%20%26chicken%20sharwama-1661950561390.jpg
Bar	Special Noodles	2000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/special%20noodles-1661950652345.jpg
Bar	Plantain & Egg Sauce	1700	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/plantain%20and%20egg%20sause-1661950840262.jpg
Bar	Fayrouz	500	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661951025032.jpg
Bar	White Rice & Stew	3000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/white%20rice%20and%20stew-1661951037816.jpg
Bar	Coke	300	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/coke-1661951081591.jpg
Bar	Jollof Spaghetti	3000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/jellof%20spaghetti-1661951183183.jpg
Bar	Porriadge Plantain	2000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/porriage%20plantain-1661951232070.jpg
Bar	Egusi Soup with Swallow	3000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/egusi-soup%20-1661951327197.jpg
Bar	Bullet Vodka	1000	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/bullet-vodka-1661951330985.jfif
Bar	Coconut Rice	3500	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/coconut%20rice-1661951382680.jpg
Bar	Fried Rice & Chicken	3500	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/rice%20and%20chicken-1661951495675.jpg
Bar	Chips & Turkey	4000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/chips%20and%20turkey-1661951561120.jpg
Bar	Monster	1000	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/monster-1661951572523.jfif
Lounge	Guinness small stout	600	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661939294819.jpg
Bar	Guinness small stout	600	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661950008721.jpg
Bar	Besty Youghurt	500	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/Besty%20youghurt-1662488650165.jpeg
Lounge	Gold Label	30000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/gold-label-1661943572972.jpg
Lounge	Andre Rose	15000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/andre-rose%20-1661943630677.jfif
Lounge	Black Label	25000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/black-label-1661943652417.jpg
Lounge	Red Label	15000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/red-label-1661943682312.jpg
Lounge	Hennessy XO	100000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/henessy-xo-1661943722829.png
Lounge	Henkell Rose	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/henkell-rose-1661943705795.jfif
Lounge	Hennessy VSOP	60000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/hennessy-vsop-1661943750857.jpg
Lounge	Hennessy VS	45000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/hennessy-vs-1661943775054.jpeg
Lounge	Grey Goose	28000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/grey-goose-1661943807474.jpeg
Lounge	Remy Martin VSOP	45000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/remy-martin-vsop-1661943849445.jpg
Lounge	Frust Vou Metternich(Black)	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/henkell-rose-1661943705795.jfif
Bar	Jameson Black	25000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/jameson-black-1661953007647.jpg
Bar	Smirnoff Ice Vodka Small	1000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/absolute-vodka-small-1661952968216.jfif
Bar	Skyy Vodka	12000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/skyy-vodka-1661953052344.jpg
Bar	Jing Jiu Herbal Small	2000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/jing-jiu-herbal-small-1661953053746.jfif
Bar	Campari	18000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/campari-1661953079527.jpg
Bar	Jing Jiu Herbal Big	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/jing-jiu-herbal-big-1661953085366.jfif
Bar	Salad	2500	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Salad-1662560629128.jpg
Bar	Red Bull	1500	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/bullet-vodka-1661951330985.jfif
Bar	Nkwobi	4000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/nkwobi-1661950140782.jpg
Bar	Peppered Gizzard	3000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/peppered%20gizzard-1661950321905.jpg
Bar	Chicken Pepper Soup	3000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/chicken%20pepper%20soup-1661950446069.jpg
Bar	Yam & Egg Sauce	1700	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/yam%20and%20egg%20sauce-1661950595844.jpg
Bar	Chips Only	1000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/chips-1661950685901.jpeg
Bar	Continental Breakfast	6000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/continental%20breakfast-1661950877989.jpg
Bar	Ogbono Soup with Swallow	3000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/ogbono-soup-1661950969451.png
Bar	Chinese Fried Rice	4000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/chinese%20fried%20rice-1661951071101.jpeg
Bar	Chicken White Sauce & Rice	4000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/chicken%20white%20sauce%20and%20rice-1661951119883.jpg
Bar	Sprite	300	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/sprite-1661951128714.jpg
Bar	Spaghetti Botognaise	3000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/spaghetti-bolognese%20-1661951155188.jpg
Bar	Bottled water	200	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg
Bar	Porriadge Yam	2000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/porriage%20yam-1661951207522.png
Bar	Chicken Sandwich Clubbing	3500	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/chicken-club-sandwich-10-1661951285641.jpg
Bar	Ora Soup with Swallow	3000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/ora%20soup-1661951351374.jpg
Bar	Power Horse	1000	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/power-horse-1661951511547.jfif
Bar	Jellof Rice	3500	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/jollof-rice-1661951523440.jpg
Bar	Rice & Turkey	4000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/rice%20and%20turkey-1661951593550.jpeg
Bar	Climax Pet	500	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/climax-pet-1661951626219.jfif
Bar	Cat Fish Pepper Soup	3000	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/cat%20fish%20pepper%20soup-1661951684833.jpg
Bar	Climax Can	700	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/climax-can-1661951753932.jfif
Bar	Cedaa Yoghurt	700	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/cedaa-yoghurt-1661951851252.jfif
Bar	Smirnof Ice	600	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnof%20ice-1662727832610.jpeg
Lounge	Drostdy-hof	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/drostdy-hof-1661943299151.jfif
Lounge	Moet Rose	40000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/moet-rose-1661942810468.jpg
Lounge	Dornfelder small	2000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/dornfelder-small-1661942832976.jfif
Lounge	Chatcaunct-du-pape	30000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/chatcaunct-du-pape-1661943004437.jfif
Lounge	Moet Brut	35000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/moet-brut-1661943245284.jpg
Lounge	Belaire Rose	40000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/belaire-rose-1661943309340.jpeg
Lounge	Carlo Rossi	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/carlo-rossi-1661943352585.jfif
Lounge	Agor	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/carlo-rossi-1661943352585.jfif
Lounge	Laurent Perrier Brut	30000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/laurent-perrier-brut-1661943395985.jpeg
Lounge	Four Cousins	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/agor-1661943381044.jfif
Lounge	Laurent Perrier Rose	45000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/laurent-perrier-rose-1661943450692.jpg
Lounge	Nerderburg	12000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/nederburg-1661943492432.jfif
Lounge	Blue Label	105000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/baileys-1661943506543.jpg
Lounge	Dornfelder	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/dornfelder-1661943589166.jfif
Bar	Chapman	2000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/chapman-1661948543713.jpg
Bar	White Russian	3000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/white-russian-1661948582995.jpg
Bar	Sex On The Beach	3000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/sex-on-the-beachl-1661948680195.jpg
Lounge	Remy Martin XO	105000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/remy-martin-xo-1661943897779.jpg
Lounge	Frust Vou Metternich(White)	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/frust-vou-metternich%28white%29-1661943907781.jfif
Lounge	Martell VS	35000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/martell-1661943934257.jpg
Lounge	Absolute Vodka Small	1200	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/absolute-vodka-small-1661944058603.jfif
Lounge	Glenfiddich (12 years)	30000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/glenfiddich-12-1661944074753.jpg
Lounge	Glenfiddich (15 years)	35000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/glenfiddich-1661944108134.png
Lounge	Smirnoff Ice Vodka Small	1500	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnoff-ice-vodka-small-1661944123790.jfif
Lounge	Ciroc Vodka	35000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/ciroc-vodka-1661944139993.jpg
Lounge	Jacobi Vsop	12000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/jacobi-vsop-1661944186369.jpg
Lounge	Jing Jiu Herbal Big	15000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/jing-jiu-herbal-big-1661944160655.jfif
Lounge	Jing Jiu Herbal Small	3000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/jing-jiu-herbal-small-1661944292745.jfif
Lounge	St Remy Vsop	35000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/st-remy-vsop-1661944399253.jfif
Lounge	Stumbras Cranberry	7000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/stumbras-cranberry-1661944455706.jfif
Lounge	Paddy	15000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/paddy-1661944493306.jfif
Lounge	John Barnamas	12000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/john-barnamas-1661944551048.jfif
Lounge	Luxardo Limonccllo	12000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/luxardo-limoncello-1661944940338.jpg
Lounge	Jameson Green	25000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/jameson-green-1661944980964.jpg
Lounge	Jameson Black	30000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/jameson-black-1661945020465.jpg
Lounge	Skyy Vodka	12000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/skyy-vodka-1661945062729.jpg
Lounge	Campari	18000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/campari-1661945109601.jpg
Lounge	Absolute Vodka	18000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/absolut-vodka-1661945143024.jpg
Lounge	Jack Daniels	25000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/jack-daniels-1661945166982.jpg
Lounge	Tequila	15000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/jack-daniels-1661945166982.jpg
Lounge	Courvesier VSOP	28000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/courvoisier-vsop-1661945239108.jpg
Lounge	Courvesier XO	90000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/courvoisier-1661945271245.jpg
Lounge	Pampelle	20000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/pampelle-1661945300921.jpg
Lounge	Hayman	20000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/haymans-1661945326387.jpg
Lounge	Lupin	15000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/lupin-1661945353020.jpg
Lounge	Bertrams	15000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/bertrams-1661945378790.jpg
Bar	Long ice land tea	3000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/long-ice-land-tea-1661948724371.jpg
Lounge	Billion rose	30000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/billion-rose-1661942554082.jfif
Lounge	ILcolle rose 	15000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/ilcolle-rose-1661942703129.jfif
Lounge	Dom Pe'rignon	12000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/dom-perignon-1661942738063.jpg
Bar	Brandy Shots	500	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/brandy-shot-1661951324639.jpg
Lounge	Bella Rosa	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/WhatsApp%20Image%202022-09-06%20at%2017.33.00-1662483490458.jpeg
Bar	Staff noodles	700	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/staff%20noodles-1662727884531.jpeg
Bar	Ogasm	3000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/orgasm-1661949847413.jpg
Bar	Sky Vodka Shots	500	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/skyy-vodka-shots-1661951283376.jpeg
Bar	Dom Pe'rignon	120000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/dom-perignon-1661951469579.jpg
Bar	Moet Rose	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/moet-rose-1661951514364.jpg
Bar	Laurent Perrier Demi Sec	35000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/laurent-perrier-demi-sec%20jfif-1661951962079.jfif
Bar	Billion Rose	30000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/billion-rose-1661952071279.jfif
Bar	Moet Brut	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/moet-brut-1661952130369.jpg
Bar	Belaire Rose	40000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/belaire-rose-1661952217140.jpeg
Bar	Laurent Perrier Brut	30000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/laurent-perrier-brut-1661952254691.jpeg
Bar	Laurent Perrier Rose	45000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/laurent-perrier-rose-1661952278688.jpg
Bar	iLcolle Rose	12000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/ilcolle-rose-1661952294550.jfif
Bar	Baileys	15000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/baileys-1661952308906.jpg
Bar	Blue Label 	105000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/blue-label-1661952339257.jpg
Bar	Dornfelder Small	2000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/dornfelder-small-1661952338431.jfif
Bar	Gold Label 	30000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/gold-label-1661952379845.jpg
Bar	Dornfelder Big	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/dornfelder-1661952392193.jfif
Bar	Black Label 	25000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/black-label-1661952414019.jpg
Bar	Red Label 	15000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/red-label-1661952451141.jpg
Bar	Chatcaunct-du-pape	30000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/chatcaunct-du-pape-1661952454660.jfif
Bar	Hennesy XO	100000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/red-label-1661952451141.jpg
Bar	Drostdy Hof	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/drostdy-hof-1661952510360.jfif
Bar	Hennesy VSOP	60000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/hennessy-vsop-1661952517236.jpg
Bar	Hennesy VS	45000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/hennessy-vs-1661952547816.jpeg
Bar	Carlo Rossi	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/carlo-rossi-1661952551173.jfif
Bar	Grey Goose	28000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/grey-goose-1661952585625.jpeg
Bar	Agor	8000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/agor-1661952592225.jfif
Bar	Remy Martin VSOP	45000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/remy-martin-vsop-1661952637839.jpg
Bar	Remy Martin XO	45000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/remy-martin-xo-1661952662699.jpg
Bar	Four Cousins	8000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/four-cousins-1661952668904.jfif
Bar	Nederburg	12000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/nederburg-1661952727180.jfif
Bar	Andre Rose	12000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/andre-rose%20-1661952778630.jfif
Bar	Henkell Rose	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/henkell-rose-1661952816438.jfif
Bar	Glenfiddich (12 years)	30000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/glenfiddich-12-1661952818219.jpg
Bar	Glenfiddich (15 years)	35000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/glenfiddich-1661952841389.png
Bar	Frust Vou Metternich(Black)	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/Frust-Vou-Metternich%28Black%29-1661952856111.jfif
Bar	Ciroc Vodka 	35000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/ciroc-vodka-1661952869615.jpg
Bar	Frust Vou Metternich(White)	10000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/frust-vou-metternich%28white%29-1661952880057.jfif
Bar	Jacobi VSOP	12000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/jacobi-vsop-1661952903169.jpg
Bar	Luxardo Limonccllo	12000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/luxardo-limoncello-1661952956810.jpg
Bar	Absolute Vodka Small	1200	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/absolute-vodka-small-1661952968216.jfif
Bar	Jameson Green	20000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/jameson-green-1661952989315.jpg
Bar	John Barnamas	12000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/john-barnamas-1661953266023.jfif
Bar	Absolute Vodka	18000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/absolut-vodka-1661953114944.jpg
Bar	Jack Daniels	25000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/jack-daniels-1661953137717.jpg
Bar	St Remy Vsop	35000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/st-remy-vsop-1661953137861.jfif
Bar	Tequila	15000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/tequila-1661953156122.jpg
Bar	Stumbras Cranberry	7000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/stumbras-cranberry-1661953185321.jfif
Bar	Courvesier VSOP	28000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/courvoisier-vsop-1661953198217.jpg
Bar	Paddy	15000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/paddy-1661953219892.jfif
Bar	Courvesier XO	90000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/courvoisier-vsop-1661953198217.jpg
Bar	Pampelle	20000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/pampelle-1661953278883.jpg
Bar	Hayman	20000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/haymans-1661953299367.jpg
Bar	Lupin	15000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/lupin-1661953316380.jpg
Bar	Bertrams	15000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/bertrams-1661953335495.jpg
Lounge	Chapman	2000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/chapman-1661953521835.jpg
Lounge	White Russian	3000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/white-russian-1661953610886.jpg
Lounge	Sex On The Beach	3000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/sex-on-the-beachl-1661953649580.jpg
Lounge	Long Ice Land Tea	3000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/long-ice-land-tea-1661953720230.jpg
Lounge	Orgasm	3000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/orgasm-1661953758722.jpg
Lounge	Tequila Shots	1500	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/tequila-shots-1661953798255.jpg
Lounge	Skyy Vodka Shots	500	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/skyy-vodka-shots-1661953850482.jpeg
Lounge	Brandy Shots	500	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/brandy-shot-1661953882227.jpg
Bar	Bella Rosa	8000	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/WhatsApp%20Image%202022-09-06%20at%2017.33.00-1662483520904.jpeg
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification (id, waiter, item, quantity, status) FROM stdin;
151	Samuel	Smirnoff ice	1	UNREAD
178	Samuel	Exotic juice	1	UNREAD
213	Samuel	Heineken	2	UNREAD
214	Samuel	Hollandia	1	UNREAD
224	Samuel	Fayrouz	1	UNREAD
225	Samuel	Red bull	1	UNREAD
251	Samuel	Peppered Goat Meat	2	UNREAD
252	Samuel	Bottled Water	1	UNREAD
288	Samuel	Star Radler	1	UNREAD
289	Samuel	Special Noodles	1	UNREAD
415	Henry	Fayrouz	1	UNREAD
416	Henry	Hollandia	1	UNREAD
430	Jennifer	Big Stout	1	UNREAD
431	Jennifer	Smirnof Ice	2	UNREAD
432	Jennifer	Bottled water	2	UNREAD
433	Jennifer	Red Bull	1	UNREAD
434	Jennifer	Amstel	1	UNREAD
339	Jennifer	Guinness small stout	1	READ
15	Kingsley	Noodles & Egg	1	READ
340	Jennifer	Hero	3	READ
341	Jennifer	Bottled water	2	READ
137	Jennifer	Special Noodles	1	READ
138	Jennifer	Chicken and Chips	1	READ
139	Jennifer	Budwiser	2	READ
403	Jennifer	Noodles & Egg	2	READ
142	Jennifer	Peppered Goat Meat	1	READ
143	Jennifer	Yam & Egg Sauce	1	READ
144	Jennifer	Noodles & Egg	1	READ
145	Jennifer	Plantain	2	READ
146	Jennifer	Maltina	1	READ
147	Jennifer	Bottled water	8	READ
148	Jennifer	Fayrouz	2	READ
149	Jennifer	Star Radler	2	READ
150	Jennifer	Desperados	3	READ
88	Jennifer	Bottled water	3	READ
89	Jennifer	Star	1	READ
215	Samuel	Red bull	1	UNREAD
226	Samuel	Desperados	1	UNREAD
253	Samuel	Heineken	1	UNREAD
254	Samuel	Bottled Water	1	UNREAD
435	Jennifer	Smirnof Ice	1	UNREAD
436	Jennifer	Star	1	UNREAD
437	Jennifer	Fayrouz	1	UNREAD
438	Jennifer	Bottled water	5	UNREAD
439	Jennifer	Hollandia	1	UNREAD
440	Jennifer	Exotic Juice	1	UNREAD
441	Jennifer	Red Bull	3	UNREAD
417	Henry	Hollandia	2	UNREAD
152	Kingsley	Beef/Chicken Sharwama	1	READ
179	Kingsley	Noodles & Egg	3	READ
180	Kingsley	Desperados	1	READ
290	Jennifer	Guinness small stout	3	READ
291	Jennifer	Heineken	1	READ
292	Jennifer	Besty Youghurt	2	READ
293	Jennifer	Bottled water	2	READ
342	Jennifer	Big Stout	3	READ
343	Jennifer	Smirnof Ice	1	READ
344	Jennifer	Bottled water	3	READ
345	Jennifer	Hollandia	1	READ
140	Jennifer	Hero	2	READ
141	Jennifer	Special Noodles	1	READ
86	Jennifer	Big Stout	1	READ
87	Jennifer	Maltina	1	READ
216	Samuel	Tiger	2	UNREAD
217	Samuel	Fayrouz	1	UNREAD
227	Samuel	Fayrouz	2	UNREAD
255	Samuel	Origin	2	UNREAD
256	Samuel	Yam & Egg Sauce	1	UNREAD
257	Samuel	Chivita juice	1	UNREAD
258	Samuel	Peppered Goat Meat	1	UNREAD
259	Samuel	Bottled Water	1	UNREAD
294	Samuel	Peppered Goat Meat	1	UNREAD
295	Samuel	Budwiser	1	UNREAD
442	Jennifer	Heineken	1	UNREAD
443	Jennifer	Smirnof Ice	1	UNREAD
444	Jennifer	Star	1	UNREAD
445	Jennifer	Guinness mid-stout	1	UNREAD
446	Jennifer	Amstel	1	UNREAD
447	Jennifer	Bottled water	2	UNREAD
128	Jennifer	Big Stout	3	READ
129	Jennifer	Desperados	7	READ
130	Jennifer	Hollandia	1	READ
131	Jennifer	Exotic Juice	1	READ
418	Henry	Desperados	1	UNREAD
419	Henry	Origin bitters	1	UNREAD
420	Henry	Bottled Water	1	UNREAD
132	Jennifer	Star Radler	1	READ
133	Jennifer	Amstel	2	READ
134	Jennifer	Besty Youghurt	5	READ
135	Jennifer	Bottled water	7	READ
276	Jennifer	Fayrouz	1	READ
277	Jennifer	Bottled water	2	READ
346	Jennifer	Guinness small stout	2	READ
347	Jennifer	33 Export	1	READ
348	Jennifer	Heineken	4	READ
349	Jennifer	Budwiser	1	READ
350	Jennifer	Guinness mid-stout	1	READ
351	Jennifer	Origin Bitters	6	READ
352	Jennifer	Gulder	1	READ
353	Jennifer	Desperados	1	READ
354	Jennifer	Life	1	READ
355	Jennifer	Hero	2	READ
356	Jennifer	Fayrouz	2	READ
153	Kingsley	Beef/Chicken Sharwama	2	READ
181	Kingsley	Noodles & Egg	4	READ
182	Kingsley	Desperados	1	READ
183	Kingsley	Bottled water	7	READ
73	Jennifer	Maltina	1	READ
74	Jennifer	Bottled water	1	READ
448	Jennifer	Hero	2	UNREAD
449	Jennifer	Star Radler	4	UNREAD
450	Jennifer	Fayrouz	2	UNREAD
451	Jennifer	Hollandia	2	UNREAD
184	Samuel	Heineken	1	UNREAD
185	Samuel	Desperados	1	UNREAD
186	Samuel	Porriadge Yam	1	UNREAD
218	Samuel	Peppered Chicken Wings	1	UNREAD
219	Samuel	Beef/Chicken Sharwama	1	UNREAD
220	Samuel	Smirnoff ice	1	UNREAD
221	Samuel	Tiger	1	UNREAD
228	Samuel	Budwiser	1	UNREAD
260	Samuel	Budwiser	1	UNREAD
261	Samuel	Guinness small stout	3	UNREAD
262	Samuel	Smirnoff ice	1	UNREAD
263	Samuel	Bottled Water	1	UNREAD
264	Samuel	Peppered Goat Meat	4	UNREAD
296	Samuel	Peppered Goat Meat	2	UNREAD
297	Samuel	Smirnoff ice	1	UNREAD
298	Samuel	Bottled Water	1	UNREAD
421	Henry	Fayrouz	1	UNREAD
422	Henry	Red bull	1	UNREAD
423	Henry	Bottled Water	1	UNREAD
424	Henry	Smirnoff ice	1	UNREAD
362	Jennifer	Heineken	1	READ
363	Jennifer	Star Radler	1	READ
364	Jennifer	Star	1	READ
365	Jennifer	Smirnof Ice	1	READ
366	Jennifer	Bottled water	11	READ
367	Jennifer	Amstel	1	READ
85	Jennifer	Budwiser	2	READ
90	Jennifer	Fayrouz	1	READ
154	Kingsley	Guinness mid-stout	1	READ
91	Jennifer	Budwiser	2	READ
92	Jennifer	Big Stout	1	READ
124	Jennifer	Noodles & Egg	1	READ
125	Jennifer	Special Noodles	1	READ
126	Jennifer	Heineken	6	READ
222	Samuel	Red bull	1	UNREAD
223	Samuel	Noodles & Egg	1	UNREAD
229	Samuel	Peppered Goat Meat	1	UNREAD
230	Samuel	Porriadge Yam	1	UNREAD
231	Samuel	Bottled Water	1	UNREAD
265	Samuel	Budwiser	3	UNREAD
266	Samuel	Heineken	3	UNREAD
452	Jennifer	Big Stout	1	UNREAD
453	Jennifer	Star Radler	5	UNREAD
454	Jennifer	Budwiser	1	UNREAD
455	Jennifer	Life	1	UNREAD
456	Jennifer	Bottled water	3	UNREAD
457	Jennifer	Fayrouz	1	UNREAD
458	Jennifer	Amstel	1	UNREAD
459	Jennifer	Orijin	1	UNREAD
425	Henry	Heineken	2	UNREAD
426	Henry	Bottled Water	1	UNREAD
136	Jennifer	Noodles & Egg	1	READ
319	Jennifer	Bottled water	5	READ
320	Jennifer	Hollandia	1	READ
321	Jennifer	Red Bull	1	READ
399	Jennifer	Yam & Egg Sauce	5	READ
400	Jennifer	Staff noodles	2	READ
401	Jennifer	Peppered Goat Meat	1	READ
127	Jennifer	Guinness small stout	4	READ
402	Jennifer	Take Away Pack	3	READ
278	Jennifer	Goat Meat Pepper Soup	2	READ
312	Jennifer	Bottled water	1	READ
313	Jennifer	Hollandia	1	READ
314	Jennifer	Orijin	1	READ
299	Jennifer	Desperados	1	READ
300	Jennifer	Hero	1	READ
301	Jennifer	Star Radler	2	READ
302	Jennifer	Bottled water	1	READ
303	Jennifer	Besty Youghurt	1	READ
155	Kingsley	Noodles & Egg	3	READ
187	Kingsley	Guinness mid-stout	1	READ
188	Kingsley	Heineken	1	READ
189	Kingsley	Star Radler	1	READ
190	Kingsley	Life	1	READ
156	Samuel	Guinness small stout	1	UNREAD
157	Samuel	Fayrouz	1	UNREAD
158	Samuel	Exotic juice	1	UNREAD
159	Samuel	Plantain	2	UNREAD
160	Samuel	Special Noodles	3	UNREAD
191	Samuel	Heineken	1	UNREAD
192	Samuel	Hollandia	1	UNREAD
232	Samuel	Peppered Chicken Wings	1	UNREAD
233	Samuel	Beef/Chicken Sharwama	1	UNREAD
234	Samuel	Smirnoff ice	1	UNREAD
235	Samuel	Tiger	1	UNREAD
236	Samuel	Bottled Water	2	UNREAD
267	Samuel	Noodles & Egg	2	UNREAD
268	Samuel	Bottled Water	2	UNREAD
269	Samuel	Plantain	2	UNREAD
270	Samuel	Peppered Goat Meat	1	UNREAD
271	Samuel	Amstel	3	UNREAD
427	Henry	Guinness mid stout	1	UNREAD
428	Henry	Heineken	1	UNREAD
460	Jennifer	Desperados	4	UNREAD
461	Jennifer	Star Radler	1	UNREAD
368	Jennifer	Guinness mid-stout	3	READ
369	Jennifer	Star Radler	1	READ
370	Jennifer	Guinness small stout	2	READ
371	Jennifer	Smirnof Ice	1	READ
372	Jennifer	Heineken	1	READ
373	Jennifer	Amstel	1	READ
374	Jennifer	Fayrouz	1	READ
375	Jennifer	Bottled water	6	READ
304	Jennifer	Bottled water	4	READ
305	Jennifer	Desperados	1	READ
306	Jennifer	Smirnof Ice	2	READ
376	Jennifer	Budwiser	1	READ
377	Jennifer	Smirnof Ice	1	READ
378	Jennifer	33 Export	1	READ
379	Jennifer	Bottled water	2	READ
380	Jennifer	Fayrouz	2	READ
381	Jennifer	Origin Bitters	2	READ
161	Samuel	Origin	2	UNREAD
193	Samuel	Tiger	1	UNREAD
237	Samuel	Heineken	2	UNREAD
238	Samuel	Hollandia	1	UNREAD
239	Samuel	Beef/Chicken Sharwama	1	UNREAD
272	Samuel	Red bull	1	UNREAD
273	Samuel	Noodles & Egg	1	UNREAD
274	Samuel	Beef/Chicken Sharwama	1	UNREAD
429	Henry	Bottled Water	2	UNREAD
462	Jennifer	Heineken	2	UNREAD
463	Jennifer	Bottled water	1	UNREAD
307	Jennifer	Desperados	1	READ
308	Jennifer	Star Radler	2	READ
309	Jennifer	Hero	1	READ
310	Jennifer	Smirnof Ice	1	READ
311	Jennifer	Bottled water	2	READ
382	Jennifer	Smirnof Ice	1	READ
383	Jennifer	Heineken	1	READ
384	Jennifer	Guinness small stout	2	READ
385	Jennifer	Budwiser	1	READ
386	Jennifer	Bottled water	1	READ
387	Jennifer	Red Bull	3	READ
388	Jennifer	Origin Bitters	2	READ
162	Samuel	Plantain	2	UNREAD
163	Samuel	Noodles & Egg	2	UNREAD
194	Samuel	Yam & Egg Sauce	1	UNREAD
195	Samuel	Bottled Water	1	UNREAD
240	Samuel	Budwiser	1	UNREAD
241	Samuel	Heineken	1	UNREAD
242	Samuel	Budwiser	1	UNREAD
243	Samuel	Heineken	1	UNREAD
464	Jennifer	Budwiser	3	UNREAD
465	Jennifer	Smirnof Ice	3	UNREAD
466	Jennifer	Guinness small stout	1	UNREAD
467	Jennifer	Exotic Juice	1	UNREAD
468	Jennifer	Bottled water	1	UNREAD
469	Jennifer	Hero	1	UNREAD
75	Jennifer	Maltina	1	READ
76	Jennifer	Bottled water	3	READ
77	Jennifer	Star	1	READ
78	Jennifer	Fayrouz	1	READ
79	Jennifer	Budwiser	2	READ
80	Jennifer	Big Stout	1	READ
81	Jennifer	Maltina	1	READ
82	Jennifer	Bottled water	3	READ
83	Jennifer	Star	1	READ
84	Jennifer	Fayrouz	1	READ
357	Jennifer	Bottled water	7	READ
358	Jennifer	Besty Youghurt	3	READ
359	Jennifer	Red Bull	5	READ
360	Jennifer	Hollandia	1	READ
361	Jennifer	Big Stout	2	READ
275	Jennifer	Guinness small stout	1	READ
164	Samuel	Guinness small stout	1	UNREAD
165	Samuel	Fayrouz	1	UNREAD
166	Samuel	Exotic juice	1	UNREAD
167	Samuel	Plantain	2	UNREAD
168	Samuel	Special Noodles	3	UNREAD
169	Samuel	Bottled Water	1	UNREAD
244	Samuel	Plantain	1	UNREAD
245	Samuel	Chicken and Chips	1	UNREAD
470	Henry	Hollandia	1	UNREAD
471	Henry	Guinness small stout	2	UNREAD
472	Henry	Origin bitters	2	UNREAD
473	Henry	Budwiser	2	UNREAD
474	Henry	Fayrouz	1	UNREAD
475	Henry	Bottled Water	3	UNREAD
389	Jennifer	33 Export	2	READ
390	Jennifer	Heineken	1	READ
391	Jennifer	Star	1	READ
392	Jennifer	Hero	1	READ
393	Jennifer	Star Radler	1	READ
394	Jennifer	Desperados	1	READ
395	Jennifer	Smirnof Ice	2	READ
396	Jennifer	Fayrouz	1	READ
397	Jennifer	Bottled water	40	READ
398	Jennifer	Hollandia	1	READ
279	Jennifer	Heineken	1	READ
280	Jennifer	Guinness small stout	1	READ
281	Jennifer	Bottled water	1	READ
315	Jennifer	33 Export	1	READ
316	Jennifer	Origin Bitters	2	READ
317	Jennifer	Heineken	1	READ
318	Jennifer	Exotic Juice	1	READ
196	Kingsley	Heineken	1	READ
197	Kingsley	Star Radler	1	READ
198	Kingsley	Life	1	READ
199	Kingsley	Guinness mid-stout	1	READ
200	Kingsley	Hero	2	READ
38	Henry	Peppered Chicken 	1	READ
39	Henry	Guinness small stout	5	READ
40	Henry	Bottled Water	1	READ
41	Henry	Fayrouz	1	READ
42	Henry	Noodles & Egg	1	READ
43	Henry	Star Radler	1	READ
44	Henry	Desperados	1	READ
45	Henry	Yam & Egg Sauce	2	READ
2	Henry	Hero	1	READ
99	Henry	Desperados	2	READ
100	Henry	Tiger	1	READ
101	Henry	Smirnoff ice	1	READ
102	Henry	Bottled Water	3	READ
103	Henry	Fayrouz	1	READ
104	Henry	Peppered Chicken 	1	READ
105	Henry	Star Radler	1	READ
106	Henry	Heineken	2	READ
246	Samuel	Fayrouz	3	UNREAD
247	Samuel	Guinness small stout	3	UNREAD
248	Samuel	Peppered Goat Meat	2	UNREAD
282	Samuel	Heineken	1	UNREAD
283	Samuel	Hollandia	1	UNREAD
170	Kingsley	Guinness mid-stout	1	READ
171	Kingsley	Heineken	1	READ
172	Kingsley	Star Radler	1	READ
201	Kingsley	Hero	2	READ
202	Kingsley	Heineken	1	READ
203	Kingsley	Star Radler	1	READ
204	Kingsley	Life	1	READ
205	Kingsley	Guinness mid-stout	1	READ
206	Kingsley	Special Noodles	1	READ
476	Henry	Hollandia	1	UNREAD
477	Henry	Guinness small stout	2	UNREAD
478	Henry	Origin bitters	2	UNREAD
479	Henry	Budwiser	2	UNREAD
480	Henry	Fayrouz	1	UNREAD
481	Henry	Bottled Water	3	UNREAD
482	Henry	Chapman	1	UNREAD
322	Jennifer	Heineken	2	READ
323	Jennifer	Guinness mid-stout	1	READ
324	Jennifer	Fayrouz	2	READ
325	Jennifer	Bottled water	1	READ
404	Jennifer	Staff noodles	1	READ
405	Jennifer	Peppered Goat Meat	3	READ
406	Jennifer	Peppered Chicken 	4	READ
55	Henry	Guinness mid stout	1	READ
56	Henry	Budwiser	3	READ
57	Henry	Guinness small stout	1	READ
58	Henry	Fayrouz	3	READ
59	Henry	Star	1	READ
60	Henry	Heineken	2	READ
61	Henry	Guinness mid stout	2	READ
62	Henry	Goat Meat Pepper Soup	2	READ
121	Henry	Amstel	1	READ
122	Henry	Budwiser	2	READ
123	Henry	Bottled Water	1	READ
114	Henry	Amstel	1	READ
115	Henry	Peppered Chicken Wings	1	READ
116	Henry	Smirnoff ice	2	READ
117	Henry	Heineken	1	READ
6	Henry	Bottled Water	1	READ
7	Henry	Origin	1	READ
8	Henry	Guinness mid stout	1	READ
9	Henry	Amstel	1	READ
10	Henry	Bottled Water	1	READ
11	Henry	Fayrouz	2	READ
21	Henry	Take Away Pack	1	READ
22	Henry	Origin bitters	1	READ
23	Henry	Bottled Water	6	READ
118	Henry	Fayrouz	2	READ
119	Henry	Tiger	6	READ
120	Henry	Heineken	3	READ
46	Henry	Peppered Goat Meat	1	READ
47	Henry	Bottled Water	1	READ
48	Henry	Origin	1	READ
49	Henry	Star Radler	1	READ
63	Henry	Peppered Chicken Wings	1	READ
64	Henry	Chips Only	1	READ
65	Henry	Origin bitters	2	READ
66	Henry	Fayrouz	2	READ
67	Henry	Bottled Water	1	READ
68	Henry	Guinness small stout	4	READ
69	Henry	Bottled Water	1	READ
70	Henry	Origin	1	READ
71	Henry	Smirnoff ice	1	READ
72	Henry	Peppered Goat Meat	1	READ
93	Henry	Fayrouz	1	READ
94	Henry	Chapman	1	READ
95	Henry	Guinness small stout	1	READ
96	Henry	Bottled Water	1	READ
97	Henry	Heineken	2	READ
98	Henry	Life	1	READ
207	Samuel	Tiger	1	UNREAD
208	Samuel	Bottled Water	1	UNREAD
209	Samuel	Peppered Goat Meat	1	UNREAD
249	Samuel	Hollandia	1	UNREAD
483	Henry	Beef/Chicken Sharwama	2	UNREAD
173	Kingsley	Beef/Chicken Sharwama	2	READ
174	Kingsley	Star	2	READ
284	Jennifer	33 Export	1	READ
285	Jennifer	Bottled water	4	READ
326	Jennifer	Heineken	6	READ
327	Jennifer	Hero	2	READ
328	Jennifer	Origin Bitters	1	READ
329	Jennifer	Desperados	1	READ
330	Jennifer	Bottled water	6	READ
331	Jennifer	Besty Youghurt	3	READ
332	Jennifer	Exotic Juice	1	READ
333	Jennifer	Red Bull	2	READ
407	Jennifer	Staff noodles	2	READ
408	Jennifer	Origin Bitters	1	READ
409	Jennifer	Besty Youghurt	3	READ
1	Henry	Budwiser	3	READ
24	Henry	Budwiser	2	READ
25	Henry	Guinness mid stout	1	READ
26	Henry	Fayrouz	1	READ
27	Henry	Origin	2	READ
28	Henry	Origin bitters	1	READ
29	Henry	Bottled Water	6	READ
30	Henry	Budwiser	2	READ
31	Henry	Guinness mid stout	1	READ
32	Henry	Fayrouz	2	READ
33	Henry	Peppered Goat Meat	1	READ
50	Henry	Peppered Goat Meat	1	READ
52	Henry	Heineken	2	READ
53	Henry	Origin bitters	2	READ
54	Henry	Bottled Water	10	READ
107	Henry	Chips Only	1	READ
108	Henry	Peppered Chicken Wings	1	READ
109	Henry	Beef/Chicken Sharwama	3	READ
110	Henry	Noodles & Egg	3	READ
111	Henry	Bottled Water	2	READ
112	Henry	Peppered Chicken 	1	READ
113	Henry	Star	1	READ
3	Henry	Bottled Water	4	READ
4	Henry	Heineken	1	READ
5	Henry	Goat Meat Pepper Soup	1	READ
12	Henry	Special Sharwama	1	READ
13	Henry	Beef/Chicken Sharwama	1	READ
14	Henry	Star Radler	2	READ
16	Henry	Peppered Goat Meat	1	READ
19	Henry	Star Radler	1	READ
17	Henry	Yam & Egg Sauce	2	READ
18	Henry	Peppered Goat Meat	2	READ
20	Henry	Amstel	1	READ
51	Henry	Hero	2	READ
34	Henry	Yam & Egg Sauce	2	READ
35	Henry	Star Radler	1	READ
36	Henry	Desperados	1	READ
37	Henry	Peppered Goat Meat	1	READ
175	Samuel	Plantain	2	UNREAD
176	Samuel	Noodles & Egg	2	UNREAD
177	Samuel	Bottled Water	2	UNREAD
250	Samuel	Beef/Chicken Sharwama	1	UNREAD
286	Samuel	Origin	1	UNREAD
287	Samuel	Fayrouz	2	UNREAD
484	Henry	Staff noodles	4	UNREAD
210	Kingsley	Star	2	READ
211	Kingsley	Beef/Chicken Sharwama	2	READ
212	Kingsley	Hollandia	1	READ
334	Jennifer	Orijin	1	READ
335	Jennifer	Desperados	1	READ
336	Jennifer	Bottled water	5	READ
337	Jennifer	Chivita Juice	1	READ
338	Jennifer	Red Bull	1	READ
410	Jennifer	Yam & Egg Sauce	2	READ
411	Jennifer	Noodles & Egg	5	READ
412	Jennifer	Take Away Pack	6	READ
413	Jennifer	Peppered Goat Meat	4	READ
414	Jennifer	Plantain	2	READ
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, username, item, price, quantity, category, image, department, table_name, "time") FROM stdin;
1	Henry	Budwiser	1000	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661939497449.jfif	Lounge	happiness lounge	2:52:36 PM
2	Henry	Hero	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661939968376.jfif	Lounge	happiness lounge	2:52:36 PM
3	Henry	Bottled Water	300	4	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	happiness lounge	2:52:36 PM
4	Henry	Heineken	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif	Lounge	happiness lounge	2:52:36 PM
5	Henry	Goat Meat Pepper Soup	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/goat%20meat%20pepper%20soup-1661950398879.jpeg	Bar	happiness 2	3:08:15 PM
6	Henry	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	happiness 2	3:08:15 PM
7	Henry	Origin	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/orijin-1661939729948.jfif	Lounge	happiness 3	3:12:07 PM
8	Henry	Guinness mid stout	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-mid-stout-1661939341052.jpg	Lounge	happiness 3	3:12:07 PM
9	Henry	Amstel	600	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/amstel-bottle-1661940544510.jpg	Lounge	happiness 4	3:13:43 PM
10	Henry	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	happiness 4	3:13:43 PM
11	Henry	Fayrouz	600	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	happiness 5	4:02:21 PM
12	Henry	Special Sharwama	2000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Special%20Sharwama-1661950526801.jpg	Bar	happiness 6	4:09:14 PM
13	Henry	Beef/Chicken Sharwama	1500	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Beef%20%26chicken%20sharwama-1661950561390.jpg	Bar	happiness 6	4:09:14 PM
14	Henry	Star Radler	600	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661939757152.jpg	Lounge	happiness 6	4:09:14 PM
18	Henry	Peppered Goat Meat	3000	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	happiness 8	6:06:39 PM
19	Henry	Star Radler	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661939757152.jpg	Lounge	happiness 8	6:06:39 PM
20	Henry	Amstel	600	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/amstel-bottle-1661940544510.jpg	Lounge	happiness 8	6:06:39 PM
21	Henry	Take Away Pack	200	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Take%20away%20packs-1661950810184.jpeg	Bar	happiness 8	6:06:39 PM
27	Henry	Origin	800	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/orijin-1661939729948.jfif	Lounge	happiness 9	6:37:22 PM
23	Henry	Bottled Water	300	12	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	happiness 10	6:27:42 PM
24	Henry	Budwiser	1000	4	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661939497449.jfif	Lounge	happiness 10	6:27:42 PM
25	Henry	Guinness mid stout	800	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-mid-stout-1661939341052.jpg	Lounge	happiness 10	6:27:42 PM
26	Henry	Fayrouz	600	3	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	happiness 10	6:27:42 PM
16	Henry	Peppered Goat Meat	3000	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	happiness 7	6:03:39 PM
17	Henry	Yam & Egg Sauce	1700	4	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/yam%20and%20egg%20sauce-1661950595844.jpg	Bar	happiness 7	6:03:39 PM
28	Henry	Star Radler	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661939757152.jpg	Lounge	happiness 7	6:56:20 PM
29	Henry	Desperados	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661939698674.jfif	Lounge	happiness 7	6:56:20 PM
30	Henry	Peppered Goat Meat	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	happiness 11	7:50:53 PM
31	Henry	Peppered Chicken 	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/peppered%20chicken-1661950282912.jpeg	Bar	happiness 11	7:50:53 PM
32	Henry	Guinness small stout	600	5	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661939294819.jpg	Lounge	happiness 11	7:50:53 PM
33	Henry	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	happiness 11	7:50:53 PM
34	Henry	Fayrouz	600	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	happiness12	8:07:57 PM
35	Henry	Noodles & Egg	1200	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Noodles%20and%20egg-1661950622402.jpg	Bar	happinessd 13	8:14:49 PM
36	Henry	Star Radler	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661939757152.jpg	Lounge	happiness 7 correction	8:42:30 PM
37	Henry	Desperados	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661939698674.jfif	Lounge	happiness 7 correction	8:42:30 PM
38	Henry	Yam & Egg Sauce	1700	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/yam%20and%20egg%20sauce-1661950595844.jpg	Bar	happiness 7 correction	8:42:30 PM
39	Henry	Peppered Goat Meat	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	happiness 7 correction	8:42:30 PM
40	Henry	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	happiness 14	8:52:19 PM
41	Henry	Origin	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/orijin-1661939729948.jfif	Lounge	happiness 14	8:52:19 PM
42	Henry	Star Radler	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661939757152.jpg	Lounge	happiness 14	8:52:19 PM
43	Henry	Peppered Goat Meat	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	happiness 14	8:52:19 PM
44	Henry	Hero	800	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661939968376.jfif	Lounge	happiness10 correction	9:21:35 PM
45	Henry	Heineken	1000	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif	Lounge	happiness10 correction	9:21:35 PM
46	Henry	Origin bitters	1000	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/origin-bitters-1661939472811.png	Lounge	happiness10 correction	9:21:35 PM
47	Henry	Bottled Water	300	10	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	happiness10 correction	9:21:35 PM
48	Henry	Guinness mid stout	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-mid-stout-1661939341052.jpg	Lounge	happiness10 correction	9:21:35 PM
49	Henry	Budwiser	1000	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661939497449.jfif	Lounge	happiness10 correction	9:21:35 PM
50	Henry	Guinness small stout	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661939294819.jpg	Lounge	happiness10 correction	9:21:35 PM
51	Henry	Fayrouz	600	3	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	happiness10 correction	9:21:35 PM
52	Henry	Star	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-1661939882022.jfif	Lounge	happiness10 correction	9:21:35 PM
53	Henry	Heineken	1000	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif	Lounge	happiness 15	10:05:56 PM
54	Henry	Guinness mid stout	800	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-mid-stout-1661939341052.jpg	Lounge	happiness 15	10:05:56 PM
55	Henry	Goat Meat Pepper Soup	3000	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/goat%20meat%20pepper%20soup-1661950398879.jpeg	Bar	happiness 15	10:05:56 PM
22	Henry	Origin bitters	1000	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/origin-bitters-1661939472811.png	Lounge	happiness 10	6:27:42 PM
56	Henry	Peppered Chicken Wings	2500	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/peppered%20chicken%20wings-1661950474315.JPG	Bar	ugo1	3:13:51 PM
57	Henry	Chips Only	1000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/chips-1661950685901.jpeg	Bar	ugo1	3:13:51 PM
58	Henry	Origin bitters	1000	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/origin-bitters-1661939472811.png	Lounge	ugo1	3:13:51 PM
59	Henry	Fayrouz	600	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	ugo1	3:13:51 PM
60	Henry	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	ugo1	3:13:51 PM
61	Henry	Guinness small stout	600	4	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661939294819.jpg	Lounge	ugo2	3:45:11 PM
62	Henry	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	ugo2	3:45:11 PM
63	Henry	Origin	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/orijin-1661939729948.jfif	Lounge	ugo3	4:50:47 PM
64	Henry	Smirnoff ice	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnoff-ice-1661939768505.jfif	Lounge	ugo3	4:50:47 PM
65	Henry	Peppered Goat Meat	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	ugo3	4:50:47 PM
67	Jennifer	Bottled water	200	10	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	sopulu1 outbar	5:16:00 PM
68	Jennifer	Star	700	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-gold-1661947549953.jfif	Bar	sopulu1 outbar	5:25:12 PM
69	Jennifer	Fayrouz	500	3	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661951025032.jpg	Bar	sopulu1 outbar	5:25:12 PM
70	Jennifer	Budwiser	800	6	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	sopulu1 outbar	5:25:12 PM
71	Jennifer	Big Stout	800	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661947312454.jfif	Bar	sopulu1 outbar	5:25:12 PM
66	Jennifer	Maltina	500	4	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/maltina-1661950378810.jpg	Bar	sopulu1 outbar	5:16:00 PM
72	Henry	Fayrouz	600	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	ugo lounge	5:28:40 PM
73	Henry	Chapman	2000	1	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/chapman-1661948543713.jpg	Bar	ugo lounge	5:28:40 PM
74	Henry	Guinness small stout	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661950008721.jpg	Bar	ugo lounge 5	5:43:27 PM
75	Henry	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	ugo lounge 5	5:43:27 PM
76	Henry	Heineken	1000	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif	Lounge	ugo lounge 6	5:55:27 PM
77	Henry	Life	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/life-1661939926602.jfif	Lounge	ugo lounge 6	5:55:27 PM
78	Henry	Desperados	800	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661939698674.jfif	Lounge	ugo lounge 6	5:55:27 PM
79	Henry	Tiger	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/Tiger-1662488462538.jpeg	Lounge	ugo lounge 6	5:55:27 PM
80	Henry	Smirnoff ice	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnoff-ice-1661939768505.jfif	Lounge	ugo lounge 6	5:55:27 PM
81	Henry	Bottled Water	300	3	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	ugo lounge 6	5:55:27 PM
82	Henry	Fayrouz	600	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	ugo lounge 7	5:57:25 PM
83	Henry	Peppered Chicken 	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/peppered%20chicken-1661950282912.jpeg	Bar	ugo lounge 7	5:57:25 PM
84	Henry	Star Radler	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661939757152.jpg	Lounge	ugo lounge 8	6:03:12 PM
85	Henry	Heineken	1000	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif	Lounge	ugo lounge 8	6:03:12 PM
86	Henry	Chips Only	1000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/chips-1661950685901.jpeg	Bar	ugo lounge 8	6:03:12 PM
87	Henry	Peppered Chicken Wings	2500	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/peppered%20chicken%20wings-1661950474315.JPG	Bar	ugo lounge 8	6:03:12 PM
88	Henry	Beef/Chicken Sharwama	1500	3	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Beef%20%26chicken%20sharwama-1661950561390.jpg	Bar	ugo lounge 9	9:25:15 PM
89	Henry	Noodles & Egg	1200	3	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Noodles%20and%20egg-1661950622402.jpg	Bar	ugo lounge 9	9:25:15 PM
90	Henry	Bottled Water	300	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	ugo lounge 9	9:25:15 PM
91	Henry	Peppered Chicken 	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/peppered%20chicken-1661950282912.jpeg	Bar	ugo lounge 10	9:27:48 PM
92	Henry	Star	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-1661939882022.jfif	Lounge	ugo lounge 10	9:27:48 PM
93	Henry	Amstel	600	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/amstel-bottle-1661940544510.jpg	Lounge	ugo lounge 10	9:27:48 PM
94	Henry	Peppered Chicken Wings	2500	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/peppered%20chicken%20wings-1661950474315.JPG	Bar	ugo lounge 11	9:29:10 PM
95	Henry	Smirnoff ice	700	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnoff-ice-1661939768505.jfif	Lounge	ugo lounge 11	9:29:10 PM
96	Henry	Heineken	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif	Lounge	ugo lounge 12	9:31:45 PM
97	Henry	Fayrouz	600	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	ugo lounge 12	9:31:45 PM
98	Henry	Tiger	700	6	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/Tiger-1662488462538.jpeg	Lounge	ugo lounge 13	10:59:06 PM
99	Henry	Heineken	1000	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif	Lounge	ugo lounge 13	10:59:06 PM
100	Henry	Amstel	600	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/amstel-bottle-1661940544510.jpg	Lounge	ugo lounge 13	10:59:06 PM
101	Henry	Budwiser	1000	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661939497449.jfif	Lounge	ugo lounge 13	10:59:06 PM
102	Henry	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	ugo lounge 13	10:59:06 PM
106	Jennifer	Heineken	800	6	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	Faith2outbar	11:21:38 PM
107	Jennifer	Guinness small stout	600	4	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661950008721.jpg	Bar	Faith2outbar	11:21:38 PM
108	Jennifer	Big Stout	800	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661947312454.jfif	Bar	Faith2outbar	11:21:38 PM
109	Jennifer	Desperados	700	7	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661947395009.jfif	Bar	Faith2outbar	11:21:38 PM
110	Jennifer	Hollandia	1500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/big-farm-pride-1661948453028.jfif	Bar	Faith2outbar	11:21:38 PM
111	Jennifer	Exotic Juice	1500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/exotic-juice-1661948406442.jfif	Bar	Faith2outbar	11:21:38 PM
112	Jennifer	Star Radler	500	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661947532264.jpg	Bar	Faith2outbar	11:21:38 PM
113	Jennifer	Amstel	500	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/amstel-bottle-1661950064604.jpg	Bar	Faith2outbar	11:21:38 PM
114	Jennifer	Besty Youghurt	500	5	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/Besty%20youghurt-1662488650165.jpeg	Bar	Faith2outbar	11:21:38 PM
115	Jennifer	Bottled water	200	7	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	Faith2outbar	11:21:38 PM
116	Jennifer	Noodles & Egg	1200	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Noodles%20and%20egg-1661950622402.jpg	Bar	Faith2outbar	11:21:38 PM
117	Jennifer	Special Noodles	2000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/special%20noodles-1661950652345.jpg	Bar	Faith2outbar	11:21:38 PM
118	Jennifer	Chicken and Chips	4000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/chicken%20%26%20chips-1661950246165.jpg	Bar	Faith2outbar	11:21:38 PM
119	Jennifer	Budwiser	800	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	Faith2outbar	11:21:38 PM
120	Jennifer	Hero	700	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	Ik	11:27:08 PM
121	Jennifer	Special Noodles	2000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/special%20noodles-1661950652345.jpg	Bar	Ik	11:27:08 PM
122	Jennifer	Peppered Goat Meat	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	Ik	11:27:08 PM
123	Jennifer	Yam & Egg Sauce	1700	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/yam%20and%20egg%20sauce-1661950595844.jpg	Bar	Ik	11:27:08 PM
124	Jennifer	Noodles & Egg	1200	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Noodles%20and%20egg-1661950622402.jpg	Bar	Ik	11:27:08 PM
125	Jennifer	Plantain	500	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/plantain%20-1662560515397.jpg	Bar	Ik	11:27:08 PM
126	Jennifer	Maltina	500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/maltina-1661950378810.jpg	Bar	Ik	11:27:08 PM
127	Jennifer	Bottled water	200	8	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	Ik	11:27:08 PM
128	Jennifer	Fayrouz	500	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661951025032.jpg	Bar	Ik	11:27:08 PM
129	Jennifer	Star Radler	500	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661947532264.jpg	Bar	Ik	11:27:08 PM
130	Jennifer	Desperados	700	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661947395009.jfif	Bar	Ik	11:27:08 PM
131	Samuel	Smirnoff ice	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnoff-ice-1661939768505.jfif	Lounge	ugo 1	11:40:40 AM
147	Samuel	Bottled Water	300	4	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	dutch table	2:16:55 PM
141	Samuel	Plantain	500	4	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/plantain%20-1662560515397.jpg	Bar	dutch table	1:35:55 PM
148	Samuel	Exotic juice	2000	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/exotic-juice-1661941551807.jfif	Lounge	ugo 3	2:33:16 PM
140	Samuel	Origin	800	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/orijin-1661939729948.jfif	Lounge	ugo 2 	12:58:39 PM
137	Samuel	Exotic juice	2000	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/exotic-juice-1661941551807.jfif	Lounge	time 2 sleep	12:57:00 PM
138	Samuel	Plantain	500	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/plantain%20-1662560515397.jpg	Bar	time 2 sleep	12:57:00 PM
139	Samuel	Special Noodles	2000	3	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/special%20noodles-1661950652345.jpg	Bar	time 2 sleep	12:57:00 PM
143	Samuel	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	time 2 sleep	1:54:09 PM
135	Samuel	Guinness small stout	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661939294819.jpg	Lounge	time 2 sleep	12:57:00 PM
157	Samuel	Tiger	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/Tiger-1662488462538.jpeg	Lounge	dior cap table	2:51:27 PM
158	Samuel	Yam & Egg Sauce	1700	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/yam%20and%20egg%20sauce-1661950595844.jpg	Bar	bar don table	2:53:56 PM
159	Samuel	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	bar don table	2:53:56 PM
134	Kingsley	Noodles & Egg	1200	4	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Noodles%20and%20egg-1661950622402.jpg	Bar	Adaku	12:48:26 PM
165	Kingsley	Hollandia	1500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/big-farm-pride-1661948453028.jfif	Bar	king	3:29:43 PM
161	Kingsley	Special Noodles	2000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/special%20noodles-1661950652345.jpg	Bar	Debbie	3:21:30 PM
151	Samuel	Heineken	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif	Lounge	counter 1	2:44:22 PM
152	Samuel	Desperados	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661939698674.jfif	Lounge	counter 1	2:44:22 PM
153	Samuel	Porriadge Yam	2000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/porriage%20yam-1661951207522.png	Bar	counter 1	2:44:22 PM
162	Samuel	Tiger	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/Tiger-1662488462538.jpeg	Lounge	under tv table	3:29:07 PM
163	Samuel	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	under tv table	3:29:07 PM
149	Kingsley	Desperados	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661947395009.jfif	Bar	Adaku	2:38:10 PM
150	Kingsley	Bottled water	200	7	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	Adaku	2:42:40 PM
145	Kingsley	Star Radler	500	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661947532264.jpg	Bar	Debbie	2:03:47 PM
154	Kingsley	Life	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/life-1661947614006.jfif	Bar	Debbie	2:46:02 PM
133	Kingsley	Guinness mid-stout	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-mid-stout-1661947241628.jpg	Bar	Debbie	11:58:55 AM
164	Samuel	Peppered Goat Meat	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	under tv table	3:29:07 PM
155	Samuel	Heineken	1000	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif	Lounge	time 2 sleep 2	2:49:10 PM
167	Samuel	Tiger	700	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/Tiger-1662488462538.jpeg	Lounge	close 2 fan table	3:46:31 PM
156	Samuel	Hollandia	2000	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/hollandia-1661941696663.jfif	Lounge	time 2 sleep 2	2:49:10 PM
132	Kingsley	Beef/Chicken Sharwama	1500	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Beef%20%26chicken%20sharwama-1661950561390.jpg	Bar	king	11:44:25 AM
146	Kingsley	Star	700	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-gold-1661947549953.jfif	Bar	king	2:14:34 PM
144	Kingsley	Heineken	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	Debbie	2:03:47 PM
160	Kingsley	Hero	700	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	Debbie	3:18:30 PM
136	Samuel	Fayrouz	600	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	time 2 sleep	12:57:00 PM
142	Samuel	Noodles & Egg	1200	4	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Noodles%20and%20egg-1661950622402.jpg	Bar	dutch table	1:35:55 PM
168	Samuel	Fayrouz	600	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	close 2 fan table	3:46:31 PM
175	Samuel	Red bull	1000	1	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/red-bull-1661941993835.jfif	Lounge	ash facecap table 	3:58:03 PM
176	Samuel	Desperados	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661939698674.jfif	Lounge	single chair table	3:59:13 PM
199	Samuel	Budwiser	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661939497449.jfif	Lounge	shaba ranks table	10:06:33 PM
178	Samuel	Peppered Goat Meat	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	achebe table 	4:12:50 PM
179	Samuel	Porriadge Yam	2000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/porriage%20yam-1661951207522.png	Bar	achebe table 	4:12:50 PM
180	Samuel	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	achebe table 	4:12:50 PM
170	Samuel	Beef/Chicken Sharwama	1500	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Beef%20%26chicken%20sharwama-1661950561390.jpg	Bar	under osadebe table	3:48:35 PM
171	Samuel	Smirnoff ice	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnoff-ice-1661939768505.jfif	Lounge	under osadebe table	3:48:35 PM
172	Samuel	Tiger	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/Tiger-1662488462538.jpeg	Lounge	under osadebe table	3:48:35 PM
181	Samuel	Bottled Water	300	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	under osadebe table	4:19:48 PM
200	Samuel	Guinness small stout	600	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661939294819.jpg	Lounge	shaba ranks table	10:06:33 PM
182	Samuel	Beef/Chicken Sharwama	1500	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Beef%20%26chicken%20sharwama-1661950561390.jpg	Bar	time 2 sleep 2	4:50:58 PM
173	Samuel	Noodles & Egg	1200	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Noodles%20and%20egg-1661950622402.jpg	Bar	counter 2	3:49:28 PM
184	Samuel	Plantain	500	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/plantain%20-1662560515397.jpg	Bar	lounge testing	5:22:48 PM
185	Samuel	Chicken and Chips	4000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/chicken%20%26%20chips-1661950246165.jpg	Bar	lounge testing	5:22:48 PM
186	Samuel	Guinness small stout	600	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661939294819.jpg	Lounge	scary face table 	5:42:34 PM
188	Samuel	Hollandia	2000	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/hollandia-1661941696663.jfif	Lounge	ugo 7	9:03:57 PM
189	Samuel	Beef/Chicken Sharwama	1500	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Beef%20%26chicken%20sharwama-1661950561390.jpg	Bar	fan 	9:06:27 PM
190	Samuel	Peppered Goat Meat	3000	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	osadebe 2	9:11:40 PM
191	Samuel	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	osadebe 2	9:11:40 PM
192	Samuel	Heineken	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif	Lounge	ugo 8	9:51:27 PM
193	Samuel	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	ugo 8	9:51:27 PM
194	Samuel	Origin	800	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/orijin-1661939729948.jfif	Lounge	tmt table	9:57:15 PM
195	Samuel	Yam & Egg Sauce	1700	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/yam%20and%20egg%20sauce-1661950595844.jpg	Bar	tmt table	9:57:15 PM
196	Samuel	Chivita juice	2000	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/chivita-juice-1661941504542.jfif	Lounge	tmt table	9:57:15 PM
197	Samuel	Peppered Goat Meat	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	tmt table	9:57:15 PM
198	Samuel	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	tmt table	9:57:15 PM
201	Samuel	Smirnoff ice	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnoff-ice-1661939768505.jfif	Lounge	shaba ranks table	10:06:33 PM
202	Samuel	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	shaba ranks table	10:06:33 PM
203	Samuel	Peppered Goat Meat	3000	4	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	shaba ranks table	10:06:33 PM
183	Samuel	Heineken	1000	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif	Lounge	counter 3 	4:54:19 PM
204	Samuel	Peppered Goat Meat	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	dutch table	11:41:10 AM
206	Samuel	Beef/Chicken Sharwama	1500	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Beef%20%26chicken%20sharwama-1661950561390.jpg	Bar	counter 2	11:42:17 AM
169	Samuel	Peppered Chicken Wings	2500	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/peppered%20chicken%20wings-1661950474315.JPG	Bar	under osadebe table	3:48:35 PM
174	Samuel	Fayrouz	600	3	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	scary face table 	3:55:15 PM
187	Samuel	Peppered Goat Meat	3000	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	scary face table 	5:42:34 PM
177	Samuel	Budwiser	1000	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661939497449.jfif	Lounge	counter 3 	4:11:00 PM
205	Samuel	Amstel	600	3	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/amstel-bottle-1661940544510.jpg	Lounge	dutch table	11:41:10 AM
166	Samuel	Red bull	1000	2	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/red-bull-1661941993835.jfif	Lounge	counter 2	3:45:27 PM
207	Jennifer	Guinness small stout	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661950008721.jpg	Bar	FAITH 1 OUTBAR	11:53:55 AM
208	Jennifer	Fayrouz	500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661951025032.jpg	Bar	FAITH 1 OUTBAR	11:53:55 AM
209	Jennifer	Bottled water	200	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	FAITH 1 OUTBAR	11:53:55 AM
210	Jennifer	Goat Meat Pepper Soup	3000	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/goat%20meat%20pepper%20soup-1661950398879.jpeg	Bar	FAITH 1 OUTBAR	11:53:55 AM
211	Jennifer	Heineken	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	FAITH 2 OUTBAR	12:23:26 PM
212	Jennifer	Guinness small stout	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661950008721.jpg	Bar	FAITH 2 OUTBAR	12:23:26 PM
213	Jennifer	Bottled water	200	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	FAITH 2 OUTBAR	12:23:26 PM
214	Samuel	Heineken	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif	Lounge	hapi 1	1:17:32 PM
215	Samuel	Hollandia	2000	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/hollandia-1661941696663.jfif	Lounge	hapi 1	1:17:32 PM
216	Jennifer	33 Export	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	IK 1 OUTBAR	1:18:02 PM
217	Jennifer	Bottled water	200	4	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	IK 1 OUTBAR	1:18:02 PM
218	Samuel	Origin	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/orijin-1661939729948.jfif	Lounge	hapi 2	1:19:16 PM
219	Samuel	Fayrouz	600	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	hapi 2	1:19:16 PM
220	Samuel	Star Radler	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661939757152.jpg	Lounge	hapi 3	1:38:24 PM
221	Samuel	Special Noodles	2000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/special%20noodles-1661950652345.jpg	Bar	hapi 3	1:38:24 PM
222	Jennifer	Guinness small stout	600	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661950008721.jpg	Bar	faith 3 outbar	2:41:59 PM
223	Jennifer	Heineken	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	faith 3 outbar	2:41:59 PM
224	Jennifer	Besty Youghurt	500	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/Besty%20youghurt-1662488650165.jpeg	Bar	faith 3 outbar	2:41:59 PM
225	Jennifer	Bottled water	200	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	faith 3 outbar	2:41:59 PM
226	Samuel	Peppered Goat Meat	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	hapi achebe	2:47:38 PM
227	Samuel	Budwiser	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661939497449.jfif	Lounge	hapi achebe	2:47:38 PM
228	Samuel	Peppered Goat Meat	3000	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	hapi time 2 sleep	3:05:05 PM
229	Samuel	Smirnoff ice	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnoff-ice-1661939768505.jfif	Lounge	hapi time 2 sleep	3:05:05 PM
230	Samuel	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	hapi time 2 sleep	3:05:05 PM
231	Jennifer	Desperados	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661947395009.jfif	Bar	spoulu 1 outbar	3:35:53 PM
232	Jennifer	Hero	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	spoulu 1 outbar	3:35:53 PM
233	Jennifer	Star Radler	500	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661947532264.jpg	Bar	spoulu 1 outbar	3:35:53 PM
234	Jennifer	Bottled water	200	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	spoulu 1 outbar	3:35:53 PM
235	Jennifer	Besty Youghurt	500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/Besty%20youghurt-1662488650165.jpeg	Bar	spoulu 1 outbar	3:35:53 PM
236	Jennifer	Bottled water	200	4	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	lk 2 outbar	3:42:33 PM
237	Jennifer	Desperados	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661947395009.jfif	Bar	lk 2 outbar	3:42:33 PM
238	Jennifer	Smirnof Ice	600	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnof%20ice-1662727832610.jpeg	Bar	lk 2 outbar	3:42:33 PM
239	Jennifer	Desperados	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661947395009.jfif	Bar	spoulu 2 outbar	4:24:17 PM
240	Jennifer	Star Radler	500	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661947532264.jpg	Bar	spoulu 2 outbar	4:24:17 PM
241	Jennifer	Hero	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	spoulu 2 outbar	4:24:17 PM
242	Jennifer	Smirnof Ice	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnof%20ice-1662727832610.jpeg	Bar	spoulu 2 outbar	4:24:17 PM
243	Jennifer	Bottled water	200	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	spoulu 2 outbar	4:24:17 PM
244	Jennifer	Bottled water	200	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	faith 4 outbar	4:26:48 PM
245	Jennifer	Hollandia	1500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/big-farm-pride-1661948453028.jfif	Bar	faith 4 outbar	4:26:48 PM
246	Jennifer	Orijin	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/orijin-1661947441277.jfif	Bar	faith 4 outbar	4:26:48 PM
247	Jennifer	33 Export	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	faith 5 outbar	5:13:08 PM
248	Jennifer	Origin Bitters	700	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/origin-bitters-1661947304167.png	Bar	faith 5 outbar	5:13:08 PM
249	Jennifer	Heineken	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	faith 5 outbar	5:13:08 PM
250	Jennifer	Exotic Juice	1500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/exotic-juice-1661948406442.jfif	Bar	faith 5 outbar	5:13:08 PM
251	Jennifer	Bottled water	200	5	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	faith 5 outbar	5:13:08 PM
252	Jennifer	Hollandia	1500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/big-farm-pride-1661948453028.jfif	Bar	faith 5 outbar	5:13:08 PM
253	Jennifer	Red Bull	1500	1	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/bullet-vodka-1661951330985.jfif	Bar	faith 5 outbar	5:13:08 PM
254	Jennifer	Heineken	1000	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	spoulu 3 outbar	5:23:22 PM
255	Jennifer	Guinness mid-stout	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-mid-stout-1661947241628.jpg	Bar	spoulu 3 outbar	5:23:22 PM
256	Jennifer	Fayrouz	500	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661951025032.jpg	Bar	spoulu 3 outbar	5:23:22 PM
257	Jennifer	Bottled water	200	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	spoulu 3 outbar	5:23:22 PM
258	Jennifer	Heineken	1000	6	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	lk 3 outbar	6:09:45 PM
259	Jennifer	Hero	700	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	lk 3 outbar	6:09:45 PM
260	Jennifer	Origin Bitters	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/origin-bitters-1661947304167.png	Bar	lk 3 outbar	6:09:45 PM
261	Jennifer	Desperados	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661947395009.jfif	Bar	lk 3 outbar	6:09:45 PM
262	Jennifer	Bottled water	200	6	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	lk 3 outbar	6:09:45 PM
263	Jennifer	Besty Youghurt	500	3	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/Besty%20youghurt-1662488650165.jpeg	Bar	lk 3 outbar	6:09:45 PM
264	Jennifer	Exotic Juice	1500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/exotic-juice-1661948406442.jfif	Bar	lk 3 outbar	6:09:45 PM
265	Jennifer	Red Bull	1500	2	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/bullet-vodka-1661951330985.jfif	Bar	lk 3 outbar	6:09:45 PM
266	Jennifer	Orijin	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/orijin-1661947441277.jfif	Bar	lk 4 outbar	6:18:51 PM
267	Jennifer	Desperados	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661947395009.jfif	Bar	lk 4 outbar	6:18:51 PM
268	Jennifer	Bottled water	200	5	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	lk 4 outbar	6:18:51 PM
269	Jennifer	Chivita Juice	1500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/chivita-juice-1661947957172.jfif	Bar	lk 4 outbar	6:18:51 PM
270	Jennifer	Red Bull	1500	1	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/bullet-vodka-1661951330985.jfif	Bar	lk 4 outbar	6:18:51 PM
271	Jennifer	Guinness small stout	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661950008721.jpg	Bar	spoulu 4 outbar	6:25:26 PM
272	Jennifer	Hero	700	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	spoulu 4 outbar	6:25:26 PM
273	Jennifer	Bottled water	200	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	spoulu 4 outbar	6:25:26 PM
274	Jennifer	Big Stout	800	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661947312454.jfif	Bar	faith 6 outbar	6:56:50 PM
275	Jennifer	Smirnof Ice	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnof%20ice-1662727832610.jpeg	Bar	faith 6 outbar	6:56:50 PM
276	Jennifer	Bottled water	200	3	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	faith 6 outbar	6:56:50 PM
277	Jennifer	Hollandia	1500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/big-farm-pride-1661948453028.jfif	Bar	faith 6 outbar	6:56:50 PM
278	Jennifer	Guinness small stout	600	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661950008721.jpg	Bar	lk 5 outbar	7:55:41 PM
279	Jennifer	33 Export	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	lk 5 outbar	7:55:41 PM
280	Jennifer	Heineken	1000	4	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	lk 5 outbar	7:55:41 PM
281	Jennifer	Budwiser	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	lk 5 outbar	7:55:41 PM
282	Jennifer	Guinness mid-stout	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-mid-stout-1661947241628.jpg	Bar	lk 5 outbar	7:55:41 PM
283	Jennifer	Origin Bitters	700	6	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/origin-bitters-1661947304167.png	Bar	lk 5 outbar	7:55:41 PM
284	Jennifer	Gulder	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/gulder-1661947739194.jfif	Bar	lk 5 outbar	7:55:41 PM
285	Jennifer	Desperados	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661947395009.jfif	Bar	lk 5 outbar	7:55:41 PM
286	Jennifer	Life	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/life-1661947614006.jfif	Bar	lk 5 outbar	7:55:41 PM
287	Jennifer	Hero	700	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	lk 5 outbar	7:55:41 PM
288	Jennifer	Fayrouz	500	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661951025032.jpg	Bar	lk 5 outbar	7:55:41 PM
289	Jennifer	Bottled water	200	7	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	lk 5 outbar	7:55:41 PM
290	Jennifer	Besty Youghurt	500	3	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/Besty%20youghurt-1662488650165.jpeg	Bar	lk 5 outbar	7:55:41 PM
291	Jennifer	Red Bull	1500	5	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/bullet-vodka-1661951330985.jfif	Bar	lk 5 outbar	7:55:41 PM
292	Jennifer	Hollandia	1500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/big-farm-pride-1661948453028.jfif	Bar	lk 5 outbar	7:55:41 PM
293	Jennifer	Big Stout	800	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661947312454.jfif	Bar	lk 5 outbar	7:55:41 PM
294	Jennifer	Heineken	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	spoulu 5 outbar	7:59:44 PM
295	Jennifer	Star Radler	500	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661947532264.jpg	Bar	spoulu 5 outbar	7:59:44 PM
296	Jennifer	Star	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-gold-1661947549953.jfif	Bar	spoulu 5 outbar	7:59:44 PM
297	Jennifer	Smirnof Ice	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnof%20ice-1662727832610.jpeg	Bar	spoulu 5 outbar	7:59:44 PM
298	Jennifer	Bottled water	200	11	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	spoulu 5 outbar	7:59:44 PM
299	Jennifer	Amstel	500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/amstel-bottle-1661950064604.jpg	Bar	spoulu 5 outbar	7:59:44 PM
300	Jennifer	Guinness mid-stout	700	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-mid-stout-1661947241628.jpg	Bar	faith 7 outbar	8:04:20 PM
301	Jennifer	Star Radler	500	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661947532264.jpg	Bar	faith 7 outbar	8:04:20 PM
302	Jennifer	Guinness small stout	600	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661950008721.jpg	Bar	faith 7 outbar	8:04:20 PM
303	Jennifer	Smirnof Ice	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnof%20ice-1662727832610.jpeg	Bar	faith 7 outbar	8:04:20 PM
304	Jennifer	Heineken	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	faith 7 outbar	8:04:20 PM
305	Jennifer	Amstel	500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/amstel-bottle-1661950064604.jpg	Bar	faith 7 outbar	8:04:20 PM
306	Jennifer	Fayrouz	500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661951025032.jpg	Bar	faith 7 outbar	8:04:20 PM
307	Jennifer	Bottled water	200	6	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	faith 7 outbar	8:04:20 PM
308	Jennifer	Budwiser	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	faith 8 outbar	8:56:25 PM
309	Jennifer	Smirnof Ice	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnof%20ice-1662727832610.jpeg	Bar	faith 8 outbar	8:56:25 PM
310	Jennifer	33 Export	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	faith 8 outbar	8:56:25 PM
311	Jennifer	Bottled water	200	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	faith 8 outbar	8:56:25 PM
312	Jennifer	Fayrouz	500	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661951025032.jpg	Bar	faith 8 outbar	8:56:25 PM
313	Jennifer	Origin Bitters	700	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/origin-bitters-1661947304167.png	Bar	faith 8 outbar	8:56:25 PM
314	Jennifer	Smirnof Ice	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnof%20ice-1662727832610.jpeg	Bar	lk 6 outbar	9:07:29 PM
315	Jennifer	Heineken	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	lk 6 outbar	9:07:29 PM
316	Jennifer	Guinness small stout	600	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661950008721.jpg	Bar	lk 6 outbar	9:07:29 PM
317	Jennifer	Budwiser	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	lk 6 outbar	9:07:29 PM
318	Jennifer	Bottled water	200	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	lk 6 outbar	9:07:29 PM
319	Jennifer	Red Bull	1500	3	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/bullet-vodka-1661951330985.jfif	Bar	lk 6 outbar	9:07:29 PM
320	Jennifer	Origin Bitters	700	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/origin-bitters-1661947304167.png	Bar	lk 6 outbar	9:07:29 PM
321	Jennifer	33 Export	700	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	spoulu 6 outbar	9:44:59 PM
322	Jennifer	Heineken	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	spoulu 6 outbar	9:44:59 PM
323	Jennifer	Star	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-gold-1661947549953.jfif	Bar	spoulu 6 outbar	9:44:59 PM
324	Jennifer	Hero	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	spoulu 6 outbar	9:44:59 PM
325	Jennifer	Star Radler	500	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661947532264.jpg	Bar	spoulu 6 outbar	9:44:59 PM
326	Jennifer	Desperados	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661947395009.jfif	Bar	spoulu 6 outbar	9:44:59 PM
327	Jennifer	Smirnof Ice	600	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnof%20ice-1662727832610.jpeg	Bar	spoulu 6 outbar	9:44:59 PM
328	Jennifer	Fayrouz	500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661951025032.jpg	Bar	spoulu 6 outbar	9:44:59 PM
329	Jennifer	Bottled water	200	40	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	spoulu 6 outbar	9:44:59 PM
330	Jennifer	Hollandia	1500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/big-farm-pride-1661948453028.jfif	Bar	spoulu 6 outbar	9:44:59 PM
332	Jennifer	Yam & Egg Sauce	1700	5	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/yam%20and%20egg%20sauce-1661950595844.jpg	Bar	lk 7 outbar	10:04:49 PM
333	Jennifer	Staff noodles	700	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/staff%20noodles-1662727884531.jpeg	Bar	lk 7 outbar	10:04:49 PM
334	Jennifer	Peppered Goat Meat	3000	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	lk 7 outbar	10:04:49 PM
335	Jennifer	Take Away Pack	200	3	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Take%20away%20packs-1661950810184.jpeg	Bar	lk 7 outbar	10:04:49 PM
336	Jennifer	Noodles & Egg	1200	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Noodles%20and%20egg-1661950622402.jpg	Bar	lk 7 outbar	10:04:49 PM
337	Jennifer	Staff noodles	700	1	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/staff%20noodles-1662727884531.jpeg	Bar	faith 9 outbar	10:07:15 PM
338	Jennifer	Peppered Goat Meat	3000	3	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	faith 9 outbar	10:07:15 PM
339	Jennifer	Peppered Chicken 	3000	4	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/peppered%20chicken-1661950282912.jpeg	Bar	faith 9 outbar	10:07:15 PM
340	Jennifer	Staff noodles	700	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/staff%20noodles-1662727884531.jpeg	Bar	jenny 1 outbar	10:09:40 PM
341	Jennifer	Origin Bitters	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/origin-bitters-1661947304167.png	Bar	jenny 1 outbar	10:09:40 PM
342	Jennifer	Besty Youghurt	500	3	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/Besty%20youghurt-1662488650165.jpeg	Bar	jenny 1 outbar	10:09:40 PM
343	Jennifer	Yam & Egg Sauce	1700	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/yam%20and%20egg%20sauce-1661950595844.jpg	Bar	spoulu 7 outbar	10:47:42 PM
344	Jennifer	Noodles & Egg	1200	5	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Noodles%20and%20egg-1661950622402.jpg	Bar	spoulu 7 outbar	10:47:42 PM
345	Jennifer	Take Away Pack	200	6	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Take%20away%20packs-1661950810184.jpeg	Bar	spoulu 7 outbar	10:47:42 PM
346	Jennifer	Peppered Goat Meat	3000	4	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Peppered-Goat-Meat-1661950305375.jpg	Bar	spoulu 7 outbar	10:47:42 PM
347	Jennifer	Plantain	500	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/plantain%20-1662560515397.jpg	Bar	spoulu 7 outbar	10:47:42 PM
348	Henry	Fayrouz	600	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	happy lounge 1	3:52:21 PM
349	Henry	Hollandia	2000	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/hollandia-1661941696663.jfif	Lounge	happy lounge 1	3:52:21 PM
350	Henry	Hollandia	2000	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/hollandia-1661941696663.jfif	Lounge	happy lounge 2	4:08:23 PM
351	Henry	Desperados	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661939698674.jfif	Lounge	happy lounge 3	4:10:41 PM
352	Henry	Origin bitters	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/origin-bitters-1661939472811.png	Lounge	happy lounge 3	4:10:41 PM
353	Henry	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	happy lounge 3	4:10:41 PM
354	Henry	Fayrouz	600	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	happy lounge 4	6:46:04 PM
355	Henry	Red bull	1000	1	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/red-bull-1661941993835.jfif	Lounge	happy lounge 4	6:46:04 PM
356	Henry	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	happy lounge 4	6:46:04 PM
357	Henry	Smirnoff ice	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnoff-ice-1661939768505.jfif	Lounge	happy lounge 4	6:46:04 PM
358	Henry	Heineken	1000	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif	Lounge	happy lounge 5	7:51:09 PM
359	Henry	Bottled Water	300	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	happy lounge 5	7:51:09 PM
360	Henry	Guinness mid stout	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-mid-stout-1661939341052.jpg	Lounge	happy lounge 6	8:39:14 PM
361	Henry	Heineken	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661939393300.jfif	Lounge	happy lounge 6	8:39:14 PM
362	Henry	Bottled Water	300	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	happy lounge 7	8:45:29 PM
363	Jennifer	Big Stout	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661947312454.jfif	Bar	Amaka1 outbar	3:24:55 PM
364	Jennifer	Smirnof Ice	600	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnof%20ice-1662727832610.jpeg	Bar	Amaka1 outbar	3:24:55 PM
365	Jennifer	Bottled water	200	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	Amaka1 outbar	3:24:55 PM
366	Jennifer	Red Bull	1500	1	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/bullet-vodka-1661951330985.jfif	Bar	Amaka1 outbar	3:24:55 PM
367	Jennifer	Amstel	500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/amstel-bottle-1661950064604.jpg	Bar	Amaka1 outbar	3:24:55 PM
368	Jennifer	Smirnof Ice	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnof%20ice-1662727832610.jpeg	Bar	Faith 1 outbar	3:29:53 PM
369	Jennifer	Star	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-gold-1661947549953.jfif	Bar	Faith 1 outbar	3:29:53 PM
370	Jennifer	Fayrouz	500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661951025032.jpg	Bar	Faith 1 outbar	3:29:53 PM
371	Jennifer	Bottled water	200	5	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	Faith 1 outbar	3:29:53 PM
372	Jennifer	Hollandia	1500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/big-farm-pride-1661948453028.jfif	Bar	Faith 1 outbar	3:29:53 PM
373	Jennifer	Exotic Juice	1500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/exotic-juice-1661948406442.jfif	Bar	Faith 1 outbar	3:29:53 PM
374	Jennifer	Red Bull	1500	3	Energy Drink	https://rainforestpos.s3.us-east-1.amazonaws.com/bullet-vodka-1661951330985.jfif	Bar	Faith 1 outbar	3:29:53 PM
375	Jennifer	Heineken	1000	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	Faith 2 outbar	4:08:18 PM
376	Jennifer	Smirnof Ice	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnof%20ice-1662727832610.jpeg	Bar	Faith 2 outbar	4:08:18 PM
377	Jennifer	Star	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-gold-1661947549953.jfif	Bar	Faith 2 outbar	4:08:18 PM
378	Jennifer	Guinness mid-stout	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-mid-stout-1661947241628.jpg	Bar	Faith 2 outbar	4:08:18 PM
379	Jennifer	Amstel	500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/amstel-bottle-1661950064604.jpg	Bar	Faith 2 outbar	4:08:18 PM
380	Jennifer	Bottled water	200	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	Faith 2 outbar	4:08:18 PM
381	Jennifer	Hero	700	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	Debbie 1 outbar	4:16:23 PM
382	Jennifer	Star Radler	500	4	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661947532264.jpg	Bar	Debbie 1 outbar	4:16:23 PM
383	Jennifer	Fayrouz	500	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661951025032.jpg	Bar	Debbie 1 outbar	4:16:23 PM
384	Jennifer	Hollandia	1500	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/big-farm-pride-1661948453028.jfif	Bar	Debbie 1 outbar	4:16:23 PM
385	Jennifer	Big Stout	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661947312454.jfif	Bar	Amaka 2 outbar	4:58:59 PM
386	Jennifer	Star Radler	500	5	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661947532264.jpg	Bar	Amaka 2 outbar	4:58:59 PM
387	Jennifer	Budwiser	800	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	Amaka 2 outbar	4:58:59 PM
388	Jennifer	Life	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/life-1661947614006.jfif	Bar	Amaka 2 outbar	4:58:59 PM
389	Jennifer	Bottled water	200	3	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	Amaka 2 outbar	4:58:59 PM
390	Jennifer	Fayrouz	500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661951025032.jpg	Bar	Amaka 2 outbar	4:58:59 PM
391	Jennifer	Amstel	500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/amstel-bottle-1661950064604.jpg	Bar	Amaka 2 outbar	4:58:59 PM
392	Jennifer	Orijin	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/orijin-1661947441277.jfif	Bar	Amaka 2 outbar	4:58:59 PM
393	Jennifer	Desperados	700	4	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/desperados-1661947395009.jfif	Bar	debbie 2 outbar	5:01:24 PM
394	Jennifer	Star Radler	500	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/star-radler-1661947532264.jpg	Bar	debbie 2 outbar	5:01:24 PM
395	Jennifer	Heineken	1000	2	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	sopulu 1 outbar	6:11:08 PM
396	Jennifer	Bottled water	200	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	sopulu 1 outbar	6:11:08 PM
397	Jennifer	Budwiser	800	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/heineken-1661947266144.jfif	Bar	lk 1 outbar	6:21:12 PM
398	Jennifer	Smirnof Ice	600	3	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/smirnof%20ice-1662727832610.jpeg	Bar	lk 1 outbar	6:21:12 PM
399	Jennifer	Guinness small stout	600	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661950008721.jpg	Bar	lk 1 outbar	6:21:12 PM
400	Jennifer	Exotic Juice	1500	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/exotic-juice-1661948406442.jfif	Bar	lk 1 outbar	6:21:12 PM
401	Jennifer	Bottled water	200	1	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661951203964.jpg	Bar	lk 1 outbar	6:21:12 PM
402	Jennifer	Hero	700	1	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/hero-1661947636551.jfif	Bar	lk 1 outbar	6:21:12 PM
404	Henry	Hollandia	2000	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/hollandia-1661941696663.jfif	Lounge	happy lounge	4:56:57 PM
405	Henry	Guinness small stout	600	4	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/guiness-small-stout-1661939294819.jpg	Lounge	happy lounge	4:56:57 PM
406	Henry	Origin bitters	1000	4	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/origin-bitters-1661939472811.png	Lounge	happy lounge	4:56:57 PM
407	Henry	Budwiser	1000	4	Beers	https://rainforestpos.s3.us-east-1.amazonaws.com/budwiser-1661939497449.jfif	Lounge	happy lounge	4:56:57 PM
408	Henry	Fayrouz	600	2	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/fayrouz-1661940604900.jpg	Lounge	happy lounge	4:56:57 PM
409	Henry	Bottled Water	300	6	Soft Drinks	https://rainforestpos.s3.us-east-1.amazonaws.com/bottled-water-1661940782491.jpg	Lounge	happy lounge	4:56:57 PM
410	Henry	Chapman	2000	1	Wines	https://rainforestpos.s3.us-east-1.amazonaws.com/chapman-1661948543713.jpg	Bar	happy lounge	5:11:40 PM
411	Henry	Beef/Chicken Sharwama	1500	2	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/Beef%20%26chicken%20sharwama-1661950561390.jpg	Bar	happy lounge 8	5:15:34 PM
412	Henry	Staff noodles	700	4	Meals	https://rainforestpos.s3.us-east-1.amazonaws.com/staff%20noodles-1662727884531.jpeg	Bar	happy lounge 9	5:17:50 PM
\.


--
-- Data for Name: tables; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tables (table_name, waiter, status, cash, pos, transfer, credit, total, discount, complimentary_drink, complimentary_qty, date, "time") FROM stdin;
happiness lounge	Henry	CLOSED	0	0	6000	0	6000	0		0	06 September2022	15:09
happiness 2	Henry	CLOSED	3300	0	0	0	3300	0		0	06 September2022	15:09
happiness 3	Henry	CLOSED	1600	0	0	0	1600	0		0	06 September2022	15:14
happiness 4	Henry	CLOSED	900	0	0	0	900	0		0	06 September2022	15:14
happiness 5	Henry	CLOSED	1200	0	0	0	1200	0		0	06 September2022	16:07
happiness 6	Henry	CLOSED	4700	0	0	0	4700	0		0	06 September2022	16:09
Adaku outbar1	Kingsley	OPEN	0	0	0	0	0	0	 	0	\N	\N
happiness 7	Henry	OPEN	0	0	0	0	0	0	 	0	\N	\N
happiness 8	Henry	CLOSED	7400	0	0	0	7400	0		0	06 September2022	18:08
happiness 10	Henry	OPEN	0	0	0	0	0	0	 	0	\N	\N
happiness 9	Henry	CLOSED	1600	0	0	0	1600	0		0	06 September2022	19:10
happiness 11	Henry	CLOSED	9300	0	0	0	9300	0		0	06 September2022	19:51
happiness12	Henry	CLOSED	600	0	0	0	600	0		0	06 September2022	20:08
happinessd 13	Henry	CLOSED	1200	0	0	0	1200	0		0	06 September2022	20:21
happiness 7 correction	Henry	CLOSED	7800	0	0	0	7800	0		0	06 September2022	20:43
happiness 14	Henry	CLOSED	4700	0	0	0	4700	0		0	06 September2022	20:53
happiness10 correction	Henry	CLOSED	15600	0	0	0	15600	0		0	06 September2022	21:25
happiness 15	Henry	CLOSED	9600	0	0	0	9600	0		0	06 September2022	22:06
ugo3	Henry	CLOSED	4500	0	0	0	4500	0		0	07 September2022	16:51
ugo1	Henry	CLOSED	0	7000	0	0	7000	0		0	07 September2022	17:02
ugo2	Henry	CLOSED	0	2700	0	0	2700	0		0	07 September2022	17:22
ugo lounge	Henry	CLOSED	0	2600	0	0	2600	0		0	07 September2022	17:41
ugo lounge 5	Henry	CLOSED	900	0	0	0	900	0		0	07 September2022	17:46
ugo lounge 6	Henry	CLOSED	0	6700	0	0	6700	0		0	07 September2022	17:55
ugo lounge 7	Henry	CLOSED	0	3600	0	0	3600	0		0	07 September2022	17:58
ugo lounge 8	Henry	CLOSED	0	6100	0	0	6100	0		0	07 September2022	18:03
ugo lounge 9	Henry	CLOSED	8700	0	0	0	8700	0		0	07 September2022	21:25
ugo lounge 10	Henry	CLOSED	4400	0	0	0	4400	0		0	07 September2022	21:40
ugo lounge 11	Henry	CLOSED	3900	0	0	0	3900	0		0	07 September2022	21:40
sopulu1 outbar	Jennifer	CLOSED	0	14800	0	0	14800	0		0	07 September2022	22:22
ugo lounge 13	Henry	CLOSED	10100	0	0	0	10100	0		0	07 September2022	22:59
faith2  outbar	Jennifer	OPEN	0	0	0	0	0	0	 	0	\N	\N
Ik	Jennifer	CLOSED	16500	0	0	0	16500	0		0	07 September2022	23:41
Faith2outbar	Jennifer	CLOSED	0	0	31700	0	31700	0		0	07 September2022	23:43
ugo lounge 12	Henry	CLOSED	2200	0	0	0	2200	0		0	08 September2022	06:42
ugo 1	Samuel	CLOSED	700	0	0	0	700	0		0	08 September2022	11:41
king	Kingsley	OPEN	0	0	0	0	0	0	 	0	\N	\N
Debbie	Kingsley	OPEN	0	0	0	0	0	0	 	0	\N	\N
Adaku	Kingsley	OPEN	0	0	0	0	0	0	 	0	\N	\N
dutch table	Samuel	OPEN	0	0	0	0	0	0	 	0	\N	\N
ugo 2 	Samuel	CLOSED	1600	0	0	0	1600	0		0	08 September2022	14:31
ugo 3	Samuel	CLOSED	0	0	2000	0	2000	0		0	08 September2022	15:10
dior cap table	Samuel	CLOSED	700	0	0	0	700	0		0	08 September2022	15:44
counter 2	Samuel	OPEN	0	0	0	0	0	0	 	0	\N	\N
single chair table	Samuel	CLOSED	0	0	800	0	800	0		0	08 September2022	16:09
lounge testing	Samuel	OPEN	0	0	0	0	0	0	 	0	\N	\N
achebe table 	Samuel	CLOSED	5300	0	0	0	5300	0		0	08 September2022	17:44
counter 1	Samuel	CLOSED	3800	0	0	0	3800	0		0	08 September2022	17:44
under tv table	Samuel	CLOSED	0	0	4000	0	4000	0		0	08 September2022	17:48
ash facecap table 	Samuel	CLOSED	1000	0	0	0	1000	0		0	08 September2022	18:09
close 2 fan table	Samuel	CLOSED	2000	0	0	0	2000	0		0	08 September2022	18:09
bar don table	Samuel	CLOSED	2000	0	0	0	2000	0		0	08 September2022	18:10
ugo 7	Samuel	CLOSED	2000	0	0	0	2000	0		0	08 September2022	21:04
fan 	Samuel	CLOSED	0	0	1500	0	1500	0		0	08 September2022	21:06
osadebe 2	Samuel	CLOSED	0	0	6300	0	6300	0		0	08 September2022	21:12
ugo 8	Samuel	CLOSED	1300	0	0	0	1300	0		0	08 September2022	21:51
tmt table	Samuel	CLOSED	0	0	8600	0	8600	0		0	08 September2022	21:58
shaba ranks table	Samuel	CLOSED	0	0	15800	0	15800	0		0	08 September2022	22:07
counter 3 	Samuel	CLOSED	0	0	6000	0	6000	0		0	09 September2022	11:37
time 2 sleep	Samuel	CLOSED	0	0	10500	0	10500	0		0	09 September2022	11:37
under osadebe table	Samuel	CLOSED	0	0	6000	0	6000	0		0	09 September2022	11:38
scary face table 	Samuel	CLOSED	9600	0	0	0	9600	0		0	09 September2022	11:39
time 2 sleep 2	Samuel	CLOSED	5500	0	0	0	5500	0		0	09 September2022	11:39
FAITH 1 OUTBAR	Jennifer	CLOSED	7500	0	0	0	7500	0		0	09 September2022	12:53
hapi 1	Samuel	CLOSED	3000	0	0	0	3000	0		0	09 September2022	13:17
hapi 2	Samuel	CLOSED	2000	0	0	0	2000	0		0	09 September2022	13:36
hapi 3	Samuel	OPEN	0	0	0	0	0	0	 	0	\N	\N
FAITH 2 OUTBAR	Jennifer	CLOSED	1800	0	0	0	1800	0		0	09 September2022	14:43
IK 1 OUTBAR	Jennifer	CLOSED	1500	0	0	0	1500	0		0	09 September2022	14:46
faith 3 outbar	Jennifer	CLOSED	4200	0	0	0	4200	0		0	09 September2022	15:45
hapi achebe	Samuel	CLOSED	4000	0	0	0	4000	0		0	09 September2022	15:39
hapi time 2 sleep	Samuel	CLOSED	7000	0	0	0	7000	0		0	09 September2022	15:40
spoulu 1 outbar	Jennifer	CLOSED	3100	0	0	0	3100	0		0	09 September2022	16:54
spoulu 2 outbar	Jennifer	CLOSED	3400	0	0	0	3400	0		0	09 September2022	16:54
lk 2 outbar	Jennifer	CLOSED	2700	0	0	0	2700	0		0	09 September2022	16:57
faith 4 outbar	Jennifer	CLOSED	2400	0	0	0	2400	0		0	09 September2022	20:05
faith 5 outbar	Jennifer	CLOSED	8600	0	0	0	8600	0		0	09 September2022	20:10
spoulu 3 outbar	Jennifer	CLOSED	3900	0	0	0	3900	0		0	09 September2022	20:12
lk 3 outbar	Jennifer	CLOSED	0	16000	0	0	16000	0		0	09 September2022	20:12
lk 4 outbar	Jennifer	CLOSED	5400	0	0	0	5400	0		0	09 September2022	20:13
spoulu 4 outbar	Jennifer	CLOSED	0	3100	0	0	3100	0		0	09 September2022	20:13
faith 6 outbar	Jennifer	CLOSED	5100	0	0	0	5100	0		0	09 September2022	20:13
lk 5 outbar	Jennifer	CLOSED	29600	0	0	0	29600	0		0	09 September2022	20:16
spoulu 5 outbar	Jennifer	CLOSED	5500	0	0	0	5500	0		0	09 September2022	20:17
faith 7 outbar	Jennifer	CLOSED	7600	0	0	0	7600	0		0	09 September2022	20:57
sopulu 7 outbar	Jennifer	OPEN	0	0	0	0	0	0	 	0	\N	\N
lk 6 outbar	Jennifer	CLOSED	9700	0	0	0	9700	0		0	09 September2022	22:12
spoulu 6 outbar	Jennifer	CLOSED	16200	0	0	0	16200	0		0	09 September2022	22:13
faith 9 outbar	Jennifer	CLOSED	21700	0	0	0	21700	0		0	09 September2022	22:31
lk 7 outbar	Jennifer	CLOSED	15900	0	0	0	15900	0		0	09 September2022	22:31
jenny 1 outbar	Jennifer	CLOSED	3600	0	0	0	3600	0		0	09 September2022	22:34
spoulu 7 outbar	Jennifer	CLOSED	23600	0	0	0	23600	0		0	09 September2022	22:48
faith 8 outbar	Jennifer	CLOSED	4900	0	0	0	4900	0		0	09 September2022	22:49
happy lounge 1	Henry	CLOSED	2600	0	0	0	2600	0		0	10 September2022	16:11
happy lounge 3	Henry	CLOSED	2100	0	0	0	2100	0		0	10 September2022	16:12
happy lounge 2	Henry	CLOSED	4000	0	0	0	4000	0		0	10 September2022	16:13
happy lounge 4	Henry	CLOSED	2600	0	0	0	2600	0		0	10 September2022	18:47
happy lounge 5	Henry	CLOSED	2300	0	0	0	2300	0		0	10 September2022	19:51
happy lounge 6	Henry	CLOSED	1800	0	0	0	1800	0		0	10 September2022	20:39
Amaka 3 outbar	Jennifer	OPEN	0	0	0	0	0	0	 	0	\N	\N
Amaka1 outbar	Jennifer	CLOSED	4400	0	0	0	4400	0		0	11 September2022	19:06
Faith 1 outbar	Jennifer	CLOSED	10300	0	0	0	10300	0		0	11 September2022	19:07
debbie 2 outbar	Jennifer	CLOSED	3300	0	0	0	3300	0		0	11 September2022	19:54
sopulu 1 outbar	Jennifer	CLOSED	2200	0	0	0	2200	0		0	11 September2022	19:58
Faith 2 outbar	Jennifer	CLOSED	3900	0	0	0	3900	0		0	11 September2022	20:00
Debbie 1 outbar	Jennifer	CLOSED	7400	0	0	0	7400	0		0	11 September2022	20:00
Amaka 2 outbar	Jennifer	CLOSED	7100	0	0	0	7100	0		0	11 September2022	20:01
lk 1 outbar	Jennifer	CLOSED	7200	0	0	0	7200	0		0	11 September2022	20:02
happy lounge	Henry	OPEN	0	0	0	0	0	0	 	0	\N	\N
happy lounge 7	Henry	CLOSED	600	0	0	0	600	0		0	12 September2022	16:57
happy lounge 8	Henry	CLOSED	3000	0	0	0	3000	0		0	12 September2022	17:16
happy lounge 9	Henry	CLOSED	2800	0	0	0	2800	0		0	12 September2022	17:18
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (username, password, role, passcode, status) FROM stdin;
C.C	$2b$12$xvdC/EE0t2U28vY0f6l3BO.kschblHCf/wh0ZOdnbxvxTjTZflTTq	Super Admin	4000	ACTIVE
Iheoma	$2b$12$XzkmA1QN5gY.F4B47p81ve3MfVYBr/RGdav9N6D0.T/U5bEMcSD3C	Super Admin	2016	ACTIVE
Jennifer	$2b$12$IiHnMpc0HwoQU2pzkjcUmeT2iiz7OvzdMyxguyo3ejMwepoCSvJge	Bar Man	1960	ACTIVE
Kingsley	$2b$12$adD6MfShkzS4/eZLEk.jme5.mGOFB64J8XflpDYHgq6Vf1K1kuYO2	Bar Man	1977	ACTIVE
Henry	$2b$12$b7nPneQwH/5AXgPQTCteo.7MyNjDBg/Mm4NPilvS79nXX.qEXglMu	Bar Man	1966	ACTIVE
Samuel	$2b$12$7yB5rnYJb1lkssIciFqsYOJp95xen0lZIy5ZiIftH64UJP/B4cs1u	Bar Man	1970	ACTIVE
Daniel	$2b$12$eixoLMcqNGT818cHbKlU3.JW4.80M7Z8ERfF94uxgv0YAie4mCAk6	Accounts	1963	ACTIVE
Patricia	$2b$12$nSnJe.dzvy28qbmepT2Nee/POm4jg6Il9F8u74djsV/DJjXzuAEg.	Accounts	2020	ACTIVE
\.


--
-- Name: credit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.credit_id_seq', 1, false);


--
-- Name: notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notification_id_seq', 484, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 412, true);


--
-- Name: credit credit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit
    ADD CONSTRAINT credit_pkey PRIMARY KEY (id);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (department, product);


--
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: tables tables_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tables
    ADD CONSTRAINT tables_pkey PRIMARY KEY (table_name);


--
-- Name: users users_passcode_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_passcode_key UNIQUE (passcode);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- Name: credit credit_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit
    ADD CONSTRAINT credit_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON DELETE SET NULL;


--
-- Name: notification notification_waiter_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_waiter_fkey FOREIGN KEY (waiter) REFERENCES public.users(username) ON DELETE SET NULL;


--
-- Name: orders orders_department_item_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_department_item_fkey FOREIGN KEY (department, item) REFERENCES public.item(department, product);


--
-- Name: orders orders_table_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_table_name_fkey FOREIGN KEY (table_name) REFERENCES public.tables(table_name);


--
-- Name: orders orders_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON DELETE SET NULL;


--
-- Name: tables tables_waiter_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tables
    ADD CONSTRAINT tables_waiter_fkey FOREIGN KEY (waiter) REFERENCES public.users(username) ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

