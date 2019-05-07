--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.5

-- Started on 2017-10-03 19:07:03 +07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 26511)
-- Name: main; Type: SCHEMA; Schema: -; Owner: root
--

CREATE SCHEMA main;


ALTER SCHEMA main OWNER TO root;

--
-- TOC entry 1 (class 3079 OID 13308)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = main, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 185 (class 1259 OID 26895)
-- Name: accesstoken; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE accesstoken (
    id text NOT NULL,
    ttl integer DEFAULT 1209600,
    created timestamp with time zone,
    userid bigint
);


ALTER TABLE accesstoken OWNER TO root;

--
-- TOC entry 187 (class 1259 OID 26904)
-- Name: acl; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE acl (
    model text,
    property text,
    accesstype text,
    permission text,
    principaltype text,
    principalid text,
    id integer NOT NULL
);


ALTER TABLE acl OWNER TO root;

--
-- TOC entry 186 (class 1259 OID 26898)
-- Name: acl_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE acl_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE acl_id_seq OWNER TO root;

--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 186
-- Name: acl_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE acl_id_seq OWNED BY acl.id;


--
-- TOC entry 205 (class 1259 OID 26952)
-- Name: booking_methods; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE booking_methods (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.64342'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE booking_methods OWNER TO root;

--
-- TOC entry 193 (class 1259 OID 26916)
-- Name: booking_methods_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE booking_methods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE booking_methods_id_seq OWNER TO root;

--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 193
-- Name: booking_methods_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE booking_methods_id_seq OWNED BY booking_methods.id;


--
-- TOC entry 207 (class 1259 OID 26964)
-- Name: cancellation_policies; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE cancellation_policies (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.651998'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE cancellation_policies OWNER TO root;

--
-- TOC entry 195 (class 1259 OID 26918)
-- Name: cancellation_policies_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE cancellation_policies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cancellation_policies_id_seq OWNER TO root;

--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 195
-- Name: cancellation_policies_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE cancellation_policies_id_seq OWNED BY cancellation_policies.id;


--
-- TOC entry 206 (class 1259 OID 26956)
-- Name: cancellation_policies_lang; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE cancellation_policies_lang (
    "ID" integer NOT NULL,
    name text,
    description text,
    cancellation_policies_id bigint NOT NULL,
    lang_id bigint NOT NULL
);


ALTER TABLE cancellation_policies_lang OWNER TO root;

--
-- TOC entry 194 (class 1259 OID 26917)
-- Name: cancellation_policies_lang_ID_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE "cancellation_policies_lang_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "cancellation_policies_lang_ID_seq" OWNER TO root;

--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 194
-- Name: cancellation_policies_lang_ID_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE "cancellation_policies_lang_ID_seq" OWNED BY cancellation_policies_lang."ID";


--
-- TOC entry 201 (class 1259 OID 26925)
-- Name: cancellations; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE cancellations (
    id integer NOT NULL,
    reason text NOT NULL,
    order_id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.638548'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE cancellations OWNER TO root;

--
-- TOC entry 188 (class 1259 OID 26911)
-- Name: cancellations_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE cancellations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cancellations_id_seq OWNER TO root;

--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 188
-- Name: cancellations_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE cancellations_id_seq OWNED BY cancellations.id;


--
-- TOC entry 213 (class 1259 OID 27007)
-- Name: categories; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE categories (
    id integer NOT NULL,
    name character varying NOT NULL,
    image_url character varying,
    category_type_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.641041'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE categories OWNER TO root;

--
-- TOC entry 190 (class 1259 OID 26913)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE categories_id_seq OWNER TO root;

--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 190
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE categories_id_seq OWNED BY categories.id;


--
-- TOC entry 208 (class 1259 OID 26969)
-- Name: categories_lang; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE categories_lang (
    "ID" integer NOT NULL,
    name text NOT NULL,
    category_id bigint NOT NULL,
    lang_id bigint NOT NULL
);


ALTER TABLE categories_lang OWNER TO root;

--
-- TOC entry 196 (class 1259 OID 26919)
-- Name: categories_lang_ID_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE "categories_lang_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "categories_lang_ID_seq" OWNER TO root;

--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 196
-- Name: categories_lang_ID_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE "categories_lang_ID_seq" OWNED BY categories_lang."ID";


--
-- TOC entry 204 (class 1259 OID 26943)
-- Name: category_type; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE category_type (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.643057'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE category_type OWNER TO root;

--
-- TOC entry 192 (class 1259 OID 26915)
-- Name: category_type_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE category_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE category_type_id_seq OWNER TO root;

--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 192
-- Name: category_type_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE category_type_id_seq OWNED BY category_type.id;


--
-- TOC entry 209 (class 1259 OID 26977)
-- Name: category_type_lang; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE category_type_lang (
    "ID" integer NOT NULL,
    name text NOT NULL,
    category_type_id bigint NOT NULL,
    lang_id bigint NOT NULL
);


ALTER TABLE category_type_lang OWNER TO root;

--
-- TOC entry 197 (class 1259 OID 26920)
-- Name: category_type_lang_ID_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE "category_type_lang_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "category_type_lang_ID_seq" OWNER TO root;

--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 197
-- Name: category_type_lang_ID_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE "category_type_lang_ID_seq" OWNED BY category_type_lang."ID";


--
-- TOC entry 211 (class 1259 OID 26989)
-- Name: cities; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE cities (
    id integer NOT NULL,
    name character varying NOT NULL,
    country_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.654601'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE cities OWNER TO root;

--
-- TOC entry 199 (class 1259 OID 26922)
-- Name: cities_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cities_id_seq OWNER TO root;

--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 199
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE cities_id_seq OWNED BY cities.id;


--
-- TOC entry 210 (class 1259 OID 26985)
-- Name: countries; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE countries (
    id integer NOT NULL,
    name character varying NOT NULL,
    region_id bigint NOT NULL,
    currency_id bigint NOT NULL,
    language_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.653455'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE countries OWNER TO root;

--
-- TOC entry 198 (class 1259 OID 26921)
-- Name: countries_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE countries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE countries_id_seq OWNER TO root;

--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 198
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE countries_id_seq OWNED BY countries.id;


--
-- TOC entry 227 (class 1259 OID 27131)
-- Name: currencies; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE currencies (
    id integer NOT NULL,
    currency_code character varying NOT NULL,
    currency_symbol character varying NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.772576'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE currencies OWNER TO root;

--
-- TOC entry 226 (class 1259 OID 27129)
-- Name: currencies_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE currencies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE currencies_id_seq OWNER TO root;

--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 226
-- Name: currencies_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE currencies_id_seq OWNED BY currencies.id;


--
-- TOC entry 218 (class 1259 OID 27048)
-- Name: features; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE features (
    id integer NOT NULL,
    icon_url character varying,
    name character varying NOT NULL,
    type character varying NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.715307'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE features OWNER TO root;

--
-- TOC entry 217 (class 1259 OID 27046)
-- Name: features_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE features_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE features_id_seq OWNER TO root;

--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 217
-- Name: features_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE features_id_seq OWNED BY features.id;


--
-- TOC entry 235 (class 1259 OID 27170)
-- Name: features_lang; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE features_lang (
    "ID" integer NOT NULL,
    feature_id bigint NOT NULL,
    lang_id bigint NOT NULL,
    name text NOT NULL
);


ALTER TABLE features_lang OWNER TO root;

--
-- TOC entry 234 (class 1259 OID 27168)
-- Name: features_lang_ID_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE "features_lang_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "features_lang_ID_seq" OWNER TO root;

--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 234
-- Name: features_lang_ID_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE "features_lang_ID_seq" OWNED BY features_lang."ID";


--
-- TOC entry 212 (class 1259 OID 27002)
-- Name: languages; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE languages (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.644749'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE languages OWNER TO root;

--
-- TOC entry 200 (class 1259 OID 26923)
-- Name: languages_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE languages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE languages_id_seq OWNER TO root;

--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 200
-- Name: languages_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE languages_id_seq OWNED BY languages.id;


--
-- TOC entry 225 (class 1259 OID 27099)
-- Name: medias; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE medias (
    id integer NOT NULL,
    url character varying NOT NULL,
    mime_type character varying NOT NULL,
    is_primary boolean NOT NULL,
    product_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.712088'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE medias OWNER TO root;

--
-- TOC entry 214 (class 1259 OID 27034)
-- Name: medias_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE medias_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE medias_id_seq OWNER TO root;

--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 214
-- Name: medias_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE medias_id_seq OWNED BY medias.id;


--
-- TOC entry 247 (class 1259 OID 27212)
-- Name: order_line_items; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE order_line_items (
    id integer NOT NULL,
    item_type character varying NOT NULL,
    price_per_unit double precision NOT NULL,
    quantity bigint NOT NULL,
    total double precision NOT NULL,
    order_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.807859'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE order_line_items OWNER TO root;

--
-- TOC entry 246 (class 1259 OID 27210)
-- Name: order_line_items_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE order_line_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE order_line_items_id_seq OWNER TO root;

--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 246
-- Name: order_line_items_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE order_line_items_id_seq OWNED BY order_line_items.id;


--
-- TOC entry 237 (class 1259 OID 27175)
-- Name: booking; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE booking (
    id integer NOT NULL,
    status character varying NOT NULL,
    total double precision NOT NULL,
    special_request text,
    access_token character varying,
    pickup_place character varying,
    pickup_time character varying,
    flight_number character varying,
    confirmed_at timestamp without time zone,
    booking_method_id bigint NOT NULL,
    product_availability_id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.79184'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE booking OWNER TO root;

--
-- TOC entry 236 (class 1259 OID 27173)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders_id_seq OWNER TO root;

--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 236
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE orders_id_seq OWNED BY booking.id;


--
-- TOC entry 243 (class 1259 OID 27196)
-- Name: payments; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE payments (
    id integer NOT NULL,
    total double precision NOT NULL,
    exchange_rate double precision NOT NULL,
    status character varying NOT NULL,
    response text NOT NULL,
    external_transaction_id character varying,
    user_id bigint NOT NULL,
    order_id bigint NOT NULL,
    payment_method_id bigint NOT NULL,
    currency_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.80402'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE payments OWNER TO root;

--
-- TOC entry 242 (class 1259 OID 27194)
-- Name: payments_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE payments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payments_id_seq OWNER TO root;

--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 242
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE payments_id_seq OWNED BY payments.id;


--
-- TOC entry 222 (class 1259 OID 27067)
-- Name: prices; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE prices (
    id integer NOT NULL,
    product_availability_id bigint NOT NULL,
    adult_price double precision NOT NULL,
    child_price double precision,
    infant_price double precision,
    adult_cost double precision NOT NULL,
    child_cost double precision,
    infant_cost double precision,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.719531'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE prices OWNER TO root;

--
-- TOC entry 221 (class 1259 OID 27065)
-- Name: prices_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE prices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE prices_id_seq OWNER TO root;

--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 221
-- Name: prices_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE prices_id_seq OWNED BY prices.id;


--
-- TOC entry 220 (class 1259 OID 27058)
-- Name: product_availabilities; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE product_availabilities (
    id integer NOT NULL,
    starts_on date NOT NULL,
    ends_on date,
    stock_available_qty bigint,
    stock_reserved_qty bigint,
    stock_booked_qty bigint,
    product_variant_id bigint NOT NULL,
    product_availability_parent_id bigint,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.71748'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE product_availabilities OWNER TO root;

--
-- TOC entry 219 (class 1259 OID 27056)
-- Name: product_availabilities_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE product_availabilities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE product_availabilities_id_seq OWNER TO root;

--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 219
-- Name: product_availabilities_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE product_availabilities_id_seq OWNED BY product_availabilities.id;


--
-- TOC entry 253 (class 1259 OID 27247)
-- Name: product_variants; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE product_variants (
    id integer NOT NULL,
    name character varying NOT NULL,
    status character varying NOT NULL,
    product_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.811346'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE product_variants OWNER TO root;

--
-- TOC entry 252 (class 1259 OID 27239)
-- Name: product_variants_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE product_variants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE product_variants_id_seq OWNER TO root;

--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 252
-- Name: product_variants_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE product_variants_id_seq OWNED BY product_variants.id;


--
-- TOC entry 249 (class 1259 OID 27222)
-- Name: products; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE products (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text NOT NULL,
    short_description text NOT NULL,
    status character varying NOT NULL,
    is_featured boolean NOT NULL,
    is_passport_required boolean NOT NULL,
    is_pickup_detail_required boolean NOT NULL,
    contract_starts_at timestamp without time zone NOT NULL,
    contract_ends_at timestamp without time zone,
    sku character varying,
    seo_description text,
    address character varying,
    pickup_details text,
    important_information text,
    minimum_adult_age smallint,
    minimum_child_age smallint,
    author_id bigint NOT NULL,
    currency_id bigint NOT NULL,
    city_id bigint NOT NULL,
    supplier_id bigint NOT NULL,
    modified_user_id bigint,
    cancellation_policy_id bigint,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.809327'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE products OWNER TO root;

--
-- TOC entry 224 (class 1259 OID 27076)
-- Name: products_categories; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE products_categories (
    id integer NOT NULL,
    product_id bigint NOT NULL,
    category_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.721665'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE products_categories OWNER TO root;

--
-- TOC entry 223 (class 1259 OID 27074)
-- Name: products_categories_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE products_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE products_categories_id_seq OWNER TO root;

--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 223
-- Name: products_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE products_categories_id_seq OWNED BY products_categories.id;


--
-- TOC entry 241 (class 1259 OID 27186)
-- Name: products_features; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE products_features (
    id integer NOT NULL,
    status character varying,
    value character varying,
    product_id bigint NOT NULL,
    feature_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.801183'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE products_features OWNER TO root;

--
-- TOC entry 240 (class 1259 OID 27184)
-- Name: products_features_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE products_features_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE products_features_id_seq OWNER TO root;

--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 240
-- Name: products_features_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE products_features_id_seq OWNED BY products_features.id;


--
-- TOC entry 248 (class 1259 OID 27220)
-- Name: products_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE products_id_seq OWNER TO root;

--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 248
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE products_id_seq OWNED BY products.id;


--
-- TOC entry 229 (class 1259 OID 27141)
-- Name: products_lang; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE products_lang (
    id integer NOT NULL,
    product_id bigint NOT NULL,
    lang_id bigint NOT NULL,
    important_information text,
    pickup_details text,
    name text NOT NULL,
    description text NOT NULL,
    description_short text NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.779187'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE products_lang OWNER TO root;

--
-- TOC entry 228 (class 1259 OID 27139)
-- Name: products_lang_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE products_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE products_lang_id_seq OWNER TO root;

--
-- TOC entry 3502 (class 0 OID 0)
-- Dependencies: 228
-- Name: products_lang_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE products_lang_id_seq OWNED BY products_lang.id;


--
-- TOC entry 245 (class 1259 OID 27202)
-- Name: regions; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE regions (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.806154'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE regions OWNER TO root;

--
-- TOC entry 244 (class 1259 OID 27200)
-- Name: regions_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE regions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE regions_id_seq OWNER TO root;

--
-- TOC entry 3503 (class 0 OID 0)
-- Dependencies: 244
-- Name: regions_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE regions_id_seq OWNED BY regions.id;


--
-- TOC entry 231 (class 1259 OID 27151)
-- Name: regions_lang; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE regions_lang (
    "ID" integer NOT NULL,
    region_id bigint NOT NULL,
    lang_id bigint NOT NULL,
    name text NOT NULL
);


ALTER TABLE regions_lang OWNER TO root;

--
-- TOC entry 230 (class 1259 OID 27149)
-- Name: regions_lang_ID_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE "regions_lang_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "regions_lang_ID_seq" OWNER TO root;

--
-- TOC entry 3504 (class 0 OID 0)
-- Dependencies: 230
-- Name: regions_lang_ID_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE "regions_lang_ID_seq" OWNED BY regions_lang."ID";


--
-- TOC entry 203 (class 1259 OID 26938)
-- Name: role; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE role (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    created timestamp with time zone,
    modified timestamp with time zone
);


ALTER TABLE role OWNER TO root;

--
-- TOC entry 191 (class 1259 OID 26914)
-- Name: role_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE role_id_seq OWNER TO root;

--
-- TOC entry 3505 (class 0 OID 0)
-- Dependencies: 191
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE role_id_seq OWNED BY role.id;


--
-- TOC entry 202 (class 1259 OID 26934)
-- Name: rolemapping; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE rolemapping (
    id integer NOT NULL,
    principaltype text,
    principalid text,
    roleid integer
);


ALTER TABLE rolemapping OWNER TO root;

--
-- TOC entry 189 (class 1259 OID 26912)
-- Name: rolemapping_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE rolemapping_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE rolemapping_id_seq OWNER TO root;

--
-- TOC entry 3506 (class 0 OID 0)
-- Dependencies: 189
-- Name: rolemapping_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE rolemapping_id_seq OWNED BY rolemapping.id;


--
-- TOC entry 216 (class 1259 OID 27038)
-- Name: schedule_details; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE schedule_details (
    id integer NOT NULL,
    content text NOT NULL,
    display_order integer NOT NULL,
    image_url character varying(255),
    product_variant_id integer,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.713176'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE schedule_details OWNER TO root;

--
-- TOC entry 215 (class 1259 OID 27036)
-- Name: schedule_details_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE schedule_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE schedule_details_id_seq OWNER TO root;

--
-- TOC entry 3507 (class 0 OID 0)
-- Dependencies: 215
-- Name: schedule_details_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE schedule_details_id_seq OWNED BY schedule_details.id;


--
-- TOC entry 251 (class 1259 OID 27232)
-- Name: schedules_details_lang; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE schedules_details_lang (
    "ID" integer NOT NULL,
    schedule_details_id bigint NOT NULL,
    lang_id bigint NOT NULL,
    content text NOT NULL
);


ALTER TABLE schedules_details_lang OWNER TO root;

--
-- TOC entry 250 (class 1259 OID 27230)
-- Name: schedules_details_lang_ID_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE "schedules_details_lang_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "schedules_details_lang_ID_seq" OWNER TO root;

--
-- TOC entry 3508 (class 0 OID 0)
-- Dependencies: 250
-- Name: schedules_details_lang_ID_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE "schedules_details_lang_ID_seq" OWNED BY schedules_details_lang."ID";


--
-- TOC entry 233 (class 1259 OID 27160)
-- Name: suppliers; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE suppliers (
    id integer NOT NULL,
    name character varying NOT NULL,
    phone_number character varying,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.788174'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE suppliers OWNER TO root;

--
-- TOC entry 232 (class 1259 OID 27158)
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE suppliers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE suppliers_id_seq OWNER TO root;

--
-- TOC entry 3509 (class 0 OID 0)
-- Dependencies: 232
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE suppliers_id_seq OWNED BY suppliers.id;


--
-- TOC entry 239 (class 1259 OID 27180)
-- Name: users; Type: TABLE; Schema: main; Owner: root
--

CREATE TABLE users (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    terms_accepted_at date NOT NULL,
    first_name character varying,
    last_name character varying,
    birthday date,
    passport_number character varying,
    phone character varying,
    country_id bigint,
    supplier_id bigint DEFAULT 0,
    created_at timestamp without time zone DEFAULT '2017-10-02 19:55:11.7945'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone,
    realm text,
    username text,
    emailverified boolean,
    verificationtoken text
);


ALTER TABLE users OWNER TO root;

--
-- TOC entry 238 (class 1259 OID 27178)
-- Name: users_id_seq; Type: SEQUENCE; Schema: main; Owner: root
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO root;

--
-- TOC entry 3510 (class 0 OID 0)
-- Dependencies: 238
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: root
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- TOC entry 3155 (class 2604 OID 26907)
-- Name: acl id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY acl ALTER COLUMN id SET DEFAULT nextval('acl_id_seq'::regclass);


--
-- TOC entry 3162 (class 2604 OID 27018)
-- Name: booking_methods id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY booking_methods ALTER COLUMN id SET DEFAULT nextval('booking_methods_id_seq'::regclass);


--
-- TOC entry 3165 (class 2604 OID 26967)
-- Name: cancellation_policies id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY cancellation_policies ALTER COLUMN id SET DEFAULT nextval('cancellation_policies_id_seq'::regclass);


--
-- TOC entry 3164 (class 2604 OID 26959)
-- Name: cancellation_policies_lang ID; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY cancellation_policies_lang ALTER COLUMN "ID" SET DEFAULT nextval('"cancellation_policies_lang_ID_seq"'::regclass);


--
-- TOC entry 3156 (class 2604 OID 26928)
-- Name: cancellations id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY cancellations ALTER COLUMN id SET DEFAULT nextval('cancellations_id_seq'::regclass);


--
-- TOC entry 3175 (class 2604 OID 27010)
-- Name: categories id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY categories ALTER COLUMN id SET DEFAULT nextval('categories_id_seq'::regclass);


--
-- TOC entry 3167 (class 2604 OID 26972)
-- Name: categories_lang ID; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY categories_lang ALTER COLUMN "ID" SET DEFAULT nextval('"categories_lang_ID_seq"'::regclass);


--
-- TOC entry 3160 (class 2604 OID 26946)
-- Name: category_type id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY category_type ALTER COLUMN id SET DEFAULT nextval('category_type_id_seq'::regclass);


--
-- TOC entry 3168 (class 2604 OID 26980)
-- Name: category_type_lang ID; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY category_type_lang ALTER COLUMN "ID" SET DEFAULT nextval('"category_type_lang_ID_seq"'::regclass);


--
-- TOC entry 3171 (class 2604 OID 26992)
-- Name: cities id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY cities ALTER COLUMN id SET DEFAULT nextval('cities_id_seq'::regclass);


--
-- TOC entry 3169 (class 2604 OID 27015)
-- Name: countries id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY countries ALTER COLUMN id SET DEFAULT nextval('countries_id_seq'::regclass);


--
-- TOC entry 3189 (class 2604 OID 27134)
-- Name: currencies id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY currencies ALTER COLUMN id SET DEFAULT nextval('currencies_id_seq'::regclass);


--
-- TOC entry 3179 (class 2604 OID 27051)
-- Name: features id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY features ALTER COLUMN id SET DEFAULT nextval('features_id_seq'::regclass);


--
-- TOC entry 3196 (class 2604 OID 27243)
-- Name: features_lang ID; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY features_lang ALTER COLUMN "ID" SET DEFAULT nextval('"features_lang_ID_seq"'::regclass);


--
-- TOC entry 3173 (class 2604 OID 27005)
-- Name: languages id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY languages ALTER COLUMN id SET DEFAULT nextval('languages_id_seq'::regclass);


--
-- TOC entry 3187 (class 2604 OID 27102)
-- Name: medias id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY medias ALTER COLUMN id SET DEFAULT nextval('medias_id_seq'::regclass);


--
-- TOC entry 3208 (class 2604 OID 27215)
-- Name: order_line_items id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY order_line_items ALTER COLUMN id SET DEFAULT nextval('order_line_items_id_seq'::regclass);


--
-- TOC entry 3197 (class 2604 OID 27261)
-- Name: booking id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY booking ALTER COLUMN id SET DEFAULT nextval('orders_id_seq'::regclass);


--
-- TOC entry 3204 (class 2604 OID 27199)
-- Name: payments id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY payments ALTER COLUMN id SET DEFAULT nextval('payments_id_seq'::regclass);


--
-- TOC entry 3183 (class 2604 OID 27070)
-- Name: prices id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY prices ALTER COLUMN id SET DEFAULT nextval('prices_id_seq'::regclass);


--
-- TOC entry 3181 (class 2604 OID 27061)
-- Name: product_availabilities id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY product_availabilities ALTER COLUMN id SET DEFAULT nextval('product_availabilities_id_seq'::regclass);


--
-- TOC entry 3213 (class 2604 OID 27250)
-- Name: product_variants id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY product_variants ALTER COLUMN id SET DEFAULT nextval('product_variants_id_seq'::regclass);


--
-- TOC entry 3210 (class 2604 OID 27225)
-- Name: products id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY products ALTER COLUMN id SET DEFAULT nextval('products_id_seq'::regclass);


--
-- TOC entry 3185 (class 2604 OID 27079)
-- Name: products_categories id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY products_categories ALTER COLUMN id SET DEFAULT nextval('products_categories_id_seq'::regclass);


--
-- TOC entry 3202 (class 2604 OID 27189)
-- Name: products_features id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY products_features ALTER COLUMN id SET DEFAULT nextval('products_features_id_seq'::regclass);


--
-- TOC entry 3191 (class 2604 OID 27144)
-- Name: products_lang id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY products_lang ALTER COLUMN id SET DEFAULT nextval('products_lang_id_seq'::regclass);


--
-- TOC entry 3206 (class 2604 OID 27205)
-- Name: regions id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY regions ALTER COLUMN id SET DEFAULT nextval('regions_id_seq'::regclass);


--
-- TOC entry 3193 (class 2604 OID 27154)
-- Name: regions_lang ID; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY regions_lang ALTER COLUMN "ID" SET DEFAULT nextval('"regions_lang_ID_seq"'::regclass);


--
-- TOC entry 3159 (class 2604 OID 26941)
-- Name: role id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY role ALTER COLUMN id SET DEFAULT nextval('role_id_seq'::regclass);


--
-- TOC entry 3158 (class 2604 OID 27021)
-- Name: rolemapping id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY rolemapping ALTER COLUMN id SET DEFAULT nextval('rolemapping_id_seq'::regclass);


--
-- TOC entry 3177 (class 2604 OID 27041)
-- Name: schedule_details id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY schedule_details ALTER COLUMN id SET DEFAULT nextval('schedule_details_id_seq'::regclass);


--
-- TOC entry 3212 (class 2604 OID 27235)
-- Name: schedules_details_lang ID; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY schedules_details_lang ALTER COLUMN "ID" SET DEFAULT nextval('"schedules_details_lang_ID_seq"'::regclass);


--
-- TOC entry 3194 (class 2604 OID 27163)
-- Name: suppliers id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY suppliers ALTER COLUMN id SET DEFAULT nextval('suppliers_id_seq'::regclass);


--
-- TOC entry 3199 (class 2604 OID 27183)
-- Name: users id; Type: DEFAULT; Schema: main; Owner: root
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- TOC entry 3402 (class 0 OID 26895)
-- Dependencies: 185
-- Data for Name: accesstoken; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY accesstoken (id, ttl, created, userid) FROM stdin;
-- WIoFV8hDSGDzfK1kqTkdu2aRtMZPtXTm0aPgEkDqtKnQArwgLbj5FGrAcpHlrjTN	1209600	2017-10-03 05:51:29.754+00	1
-- qGFM2KtQ0vqVR9OPacV8tHWrDwWhi2sIAH5rfT1qVNtADmcKDCO8bBrqUnbdABG1	1209600	2017-10-03 09:52:17.46+00	1
-- 6LYvrkzj6roWb5TRPnmxeX7UQXNCgEpcW69Ihoophfn1G0wWwZFptFEYLuTxr6aE	1209600	2017-10-03 11:40:40.186+00	31
-- dJ6f2ABUmAQTq4Kh0pKeolW0Bl9anZuMXPTUDX2cWG0ERTgHZ2WJx6MtAufN6Vmg	1209600	2017-10-03 11:42:12.043+00	31
-- beMm5oDN4gzIxCIyRfXKmyRDkhNtCRm3IFtfgZ8fgOTMA99b3Un8Lfncr4gz75Xs	1209600	2017-10-03 11:43:14.907+00	31
-- EyToBbxGaydNuAhzgsy7Atp4MsqIhMviQeJ7y2mD9WK8eGLd1A4IFjnNOD1b6fiS	1209600	2017-10-03 11:46:26.149+00	31
-- L3HC575SU5ucwxIn7I5vxl5JHLtXj0AxkXfjC69qOLwqTTe7hZ4YtfNWkERn8a4A	1209600	2017-10-03 11:48:36.63+00	31
-- YdDM34dAMA6sgZRsk0qjekGHlmFFHnrXX25Pu7V3mV4pZeWdqjUg20HylD6qUB9I	1209600	2017-10-03 11:49:19.025+00	31
-- HBvkpUeozM0WoEF4ybEuP01D0qN5TbVgLlfzOpfAPkE8B7ZSnr2TC0LWhtHEyBrk	1209600	2017-10-03 11:52:09.849+00	31
-- V15zKmF5Ng71eGoSFt5leU4gWXomJNPz77toVDDLO1xKwA2EpH9ISgzfVCGTaxyV	1209600	2017-10-03 11:52:53.431+00	31
-- 2ByFPNHaVpclcpfPfeKBEeqhWXGDHLq3fXy1WhM0WOyjUZ5DBNddm2CgHfOVY4SL	1209600	2017-10-03 11:54:05.72+00	31
-- T5da7uE0tYgeMDtndy8YoQOReO5ehQ4A1obZ33GqrXHNFDrJHEygdGdQkLiK0HeW	1209600	2017-10-03 11:54:19.739+00	31
--\.


--
-- TOC entry 3404 (class 0 OID 26904)
-- Dependencies: 187
-- Data for Name: acl; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY acl (model, property, accesstype, permission, principaltype, principalid, id) FROM stdin;
--\.


--
-- TOC entry 3511 (class 0 OID 0)
-- Dependencies: 186
-- Name: acl_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('acl_id_seq', 1, false);


--
-- TOC entry 3422 (class 0 OID 26952)
-- Dependencies: 205
-- Data for Name: booking_methods; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY booking_methods (id, name, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3512 (class 0 OID 0)
-- Dependencies: 193
-- Name: booking_methods_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('booking_methods_id_seq', 1, false);


--
-- TOC entry 3424 (class 0 OID 26964)
-- Dependencies: 207
-- Data for Name: cancellation_policies; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY cancellation_policies (id, name, description, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3513 (class 0 OID 0)
-- Dependencies: 195
-- Name: cancellation_policies_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('cancellation_policies_id_seq', 1, false);


--
-- TOC entry 3423 (class 0 OID 26956)
-- Dependencies: 206
-- Data for Name: cancellation_policies_lang; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY cancellation_policies_lang ("ID", name, description, cancellation_policies_id, lang_id) FROM stdin;
--\.


--
-- TOC entry 3514 (class 0 OID 0)
-- Dependencies: 194
-- Name: cancellation_policies_lang_ID_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('"cancellation_policies_lang_ID_seq"', 1, false);


--
-- TOC entry 3418 (class 0 OID 26925)
-- Dependencies: 201
-- Data for Name: cancellations; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY cancellations (id, reason, order_id, user_id, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3515 (class 0 OID 0)
-- Dependencies: 188
-- Name: cancellations_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('cancellations_id_seq', 1, false);


--
-- TOC entry 3430 (class 0 OID 27007)
-- Dependencies: 213
-- Data for Name: categories; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY categories (id, name, image_url, category_type_id, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3516 (class 0 OID 0)
-- Dependencies: 190
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('categories_id_seq', 1, false);


--
-- TOC entry 3425 (class 0 OID 26969)
-- Dependencies: 208
-- Data for Name: categories_lang; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY categories_lang ("ID", name, category_id, lang_id) FROM stdin;
--\.


--
-- TOC entry 3517 (class 0 OID 0)
-- Dependencies: 196
-- Name: categories_lang_ID_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('"categories_lang_ID_seq"', 1, false);


--
-- TOC entry 3421 (class 0 OID 26943)
-- Dependencies: 204
-- Data for Name: category_type; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY category_type (id, name, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3518 (class 0 OID 0)
-- Dependencies: 192
-- Name: category_type_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('category_type_id_seq', 1, false);


--
-- TOC entry 3426 (class 0 OID 26977)
-- Dependencies: 209
-- Data for Name: category_type_lang; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY category_type_lang ("ID", name, category_type_id, lang_id) FROM stdin;
--\.


--
-- TOC entry 3519 (class 0 OID 0)
-- Dependencies: 197
-- Name: category_type_lang_ID_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('"category_type_lang_ID_seq"', 1, false);


--
-- TOC entry 3428 (class 0 OID 26989)
-- Dependencies: 211
-- Data for Name: cities; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY cities (id, name, country_id, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3520 (class 0 OID 0)
-- Dependencies: 199
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('cities_id_seq', 1, false);


--
-- TOC entry 3427 (class 0 OID 26985)
-- Dependencies: 210
-- Data for Name: countries; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY countries (id, name, region_id, currency_id, language_id, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3521 (class 0 OID 0)
-- Dependencies: 198
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('countries_id_seq', 1, false);


--
-- TOC entry 3444 (class 0 OID 27131)
-- Dependencies: 227
-- Data for Name: currencies; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY currencies (id, currency_code, currency_symbol, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3522 (class 0 OID 0)
-- Dependencies: 226
-- Name: currencies_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('currencies_id_seq', 1, false);


--
-- TOC entry 3435 (class 0 OID 27048)
-- Dependencies: 218
-- Data for Name: features; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY features (id, icon_url, name, type, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3523 (class 0 OID 0)
-- Dependencies: 217
-- Name: features_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('features_id_seq', 1, false);


--
-- TOC entry 3452 (class 0 OID 27170)
-- Dependencies: 235
-- Data for Name: features_lang; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY features_lang ("ID", feature_id, lang_id, name) FROM stdin;
--\.


--
-- TOC entry 3524 (class 0 OID 0)
-- Dependencies: 234
-- Name: features_lang_ID_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('"features_lang_ID_seq"', 1, false);


--
-- TOC entry 3429 (class 0 OID 27002)
-- Dependencies: 212
-- Data for Name: languages; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY languages (id, name, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3525 (class 0 OID 0)
-- Dependencies: 200
-- Name: languages_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('languages_id_seq', 1, false);


--
-- TOC entry 3442 (class 0 OID 27099)
-- Dependencies: 225
-- Data for Name: medias; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY medias (id, url, mime_type, is_primary, product_id, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3526 (class 0 OID 0)
-- Dependencies: 214
-- Name: medias_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('medias_id_seq', 1, false);


--
-- TOC entry 3464 (class 0 OID 27212)
-- Dependencies: 247
-- Data for Name: order_line_items; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY order_line_items (id, item_type, price_per_unit, quantity, total, order_id, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3527 (class 0 OID 0)
-- Dependencies: 246
-- Name: order_line_items_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('order_line_items_id_seq', 1, false);


--
-- TOC entry 3454 (class 0 OID 27175)
-- Dependencies: 237
-- Data for Name: booking; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY booking (id, status, total, special_request, access_token, pickup_place, pickup_time, flight_number, confirmed_at, booking_method_id, product_availability_id, user_id, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3528 (class 0 OID 0)
-- Dependencies: 236
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('orders_id_seq', 1, false);


--
-- TOC entry 3460 (class 0 OID 27196)
-- Dependencies: 243
-- Data for Name: payments; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY payments (id, total, exchange_rate, status, response, external_transaction_id, user_id, order_id, payment_method_id, currency_id, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3529 (class 0 OID 0)
-- Dependencies: 242
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('payments_id_seq', 1, false);


--
-- TOC entry 3439 (class 0 OID 27067)
-- Dependencies: 222
-- Data for Name: prices; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY prices (id, product_availability_id, adult_price, child_price, infant_price, adult_cost, child_cost, infant_cost, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3530 (class 0 OID 0)
-- Dependencies: 221
-- Name: prices_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('prices_id_seq', 1, false);


--
-- TOC entry 3437 (class 0 OID 27058)
-- Dependencies: 220
-- Data for Name: product_availabilities; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY product_availabilities (id, starts_on, ends_on, stock_available_qty, stock_reserved_qty, stock_booked_qty, product_variant_id, product_availability_parent_id, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3531 (class 0 OID 0)
-- Dependencies: 219
-- Name: product_availabilities_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('product_availabilities_id_seq', 1, false);


--
-- TOC entry 3470 (class 0 OID 27247)
-- Dependencies: 253
-- Data for Name: product_variants; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY product_variants (id, name, status, product_id, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3532 (class 0 OID 0)
-- Dependencies: 252
-- Name: product_variants_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('product_variants_id_seq', 1, false);


--
-- TOC entry 3466 (class 0 OID 27222)
-- Dependencies: 249
-- Data for Name: products; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY products (id, name, description, short_description, status, is_featured, is_passport_required, is_pickup_detail_required, contract_starts_at, contract_ends_at, sku, seo_description, address, pickup_details, important_information, minimum_adult_age, minimum_child_age, author_id, currency_id, city_id, supplier_id, modified_user_id, cancellation_policy_id, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3441 (class 0 OID 27076)
-- Dependencies: 224
-- Data for Name: products_categories; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY products_categories (id, product_id, category_id, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3533 (class 0 OID 0)
-- Dependencies: 223
-- Name: products_categories_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('products_categories_id_seq', 1, false);


--
-- TOC entry 3458 (class 0 OID 27186)
-- Dependencies: 241
-- Data for Name: products_features; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY products_features (id, status, value, product_id, feature_id, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3534 (class 0 OID 0)
-- Dependencies: 240
-- Name: products_features_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('products_features_id_seq', 1, false);


--
-- TOC entry 3535 (class 0 OID 0)
-- Dependencies: 248
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('products_id_seq', 1, false);


--
-- TOC entry 3446 (class 0 OID 27141)
-- Dependencies: 229
-- Data for Name: products_lang; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY products_lang (id, product_id, lang_id, important_information, pickup_details, name, description, description_short, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3536 (class 0 OID 0)
-- Dependencies: 228
-- Name: products_lang_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('products_lang_id_seq', 1, false);


--
-- TOC entry 3462 (class 0 OID 27202)
-- Dependencies: 245
-- Data for Name: regions; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY regions (id, name, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3537 (class 0 OID 0)
-- Dependencies: 244
-- Name: regions_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('regions_id_seq', 1, false);


--
-- TOC entry 3448 (class 0 OID 27151)
-- Dependencies: 231
-- Data for Name: regions_lang; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY regions_lang ("ID", region_id, lang_id, name) FROM stdin;
--\.


--
-- TOC entry 3538 (class 0 OID 0)
-- Dependencies: 230
-- Name: regions_lang_ID_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('"regions_lang_ID_seq"', 1, false);


--
-- TOC entry 3420 (class 0 OID 26938)
-- Dependencies: 203
-- Data for Name: role; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY role (id, name, description, created, modified) FROM stdin;
--\.


--
-- TOC entry 3539 (class 0 OID 0)
-- Dependencies: 191
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('role_id_seq', 1, false);


--
-- TOC entry 3419 (class 0 OID 26934)
-- Dependencies: 202
-- Data for Name: rolemapping; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY rolemapping (id, principaltype, principalid, roleid) FROM stdin;
--\.


--
-- TOC entry 3540 (class 0 OID 0)
-- Dependencies: 189
-- Name: rolemapping_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('rolemapping_id_seq', 1, false);


--
-- TOC entry 3433 (class 0 OID 27038)
-- Dependencies: 216
-- Data for Name: schedule_details; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY schedule_details (id, content, display_order, image_url, product_variant_id, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3541 (class 0 OID 0)
-- Dependencies: 215
-- Name: schedule_details_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('schedule_details_id_seq', 1, false);


--
-- TOC entry 3468 (class 0 OID 27232)
-- Dependencies: 251
-- Data for Name: schedules_details_lang; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY schedules_details_lang ("ID", schedule_details_id, lang_id, content) FROM stdin;
--\.


--
-- TOC entry 3542 (class 0 OID 0)
-- Dependencies: 250
-- Name: schedules_details_lang_ID_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('"schedules_details_lang_ID_seq"', 1, false);


--
-- TOC entry 3450 (class 0 OID 27160)
-- Dependencies: 233
-- Data for Name: suppliers; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY suppliers (id, name, phone_number, created_at, updated_at) FROM stdin;
--\.


--
-- TOC entry 3543 (class 0 OID 0)
-- Dependencies: 232
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('suppliers_id_seq', 1, false);


--
-- TOC entry 3456 (class 0 OID 27180)
-- Dependencies: 239
-- Data for Name: users; Type: TABLE DATA; Schema: main; Owner: root
--

--COPY users (id, email, password, terms_accepted_at, first_name, last_name, birthday, passport_number, phone, country_id, supplier_id, created_at, updated_at, realm, username, emailverified, verificationtoken) FROM stdin;
-- 1	test6@tes.com	$2a$10$kCho75.r0/u7HiCcbuMm9uzld6Sjjq0hLgbNVK5vP7nC3xOhJrrRa	2017-10-02	\N	\N	2017-10-02	\N	\N	\N	0	2017-10-03 05:51:11.528	\N	\N	\N	\N	\N
-- 13	test7@tes.com	$2a$10$EyWEj1Sdrs5RkSqRHp.FIexFyX5zkqiezpdQViLFE.YDfoGMA/n3e	2017-10-03	\N	\N	2017-10-03	\N	\N	\N	0	2017-10-03 11:22:01.69	\N	\N	\N	\N	\N
-- 31	elliotalderson@protonmail.com	$2a$10$smzKLb3rip29fjKdh.4Weuel8R5xz8l.TGzn6l2hLVYqfsiwIgX52	2017-10-03	\N	\N	2017-10-03	\N	\N	\N	0	2017-10-03 11:40:36.443	\N	\N	\N	\N	\N
-- --\.


--
-- TOC entry 3544 (class 0 OID 0)
-- Dependencies: 238
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: main; Owner: root
--

SELECT pg_catalog.setval('users_id_seq', 31, true);


--
-- TOC entry 3216 (class 2606 OID 26998)
-- Name: accesstoken accesstoken_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY accesstoken
    ADD CONSTRAINT accesstoken_pkey PRIMARY KEY (id);


--
-- TOC entry 3218 (class 2606 OID 27000)
-- Name: acl acl_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY acl
    ADD CONSTRAINT acl_pkey PRIMARY KEY (id);


--
-- TOC entry 3228 (class 2606 OID 27120)
-- Name: booking_methods booking_methods_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY booking_methods
    ADD CONSTRAINT booking_methods_pkey PRIMARY KEY (id);


--
-- TOC entry 3230 (class 2606 OID 27098)
-- Name: cancellation_policies_lang cancellation_policies_lang_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY cancellation_policies_lang
    ADD CONSTRAINT cancellation_policies_lang_pkey PRIMARY KEY ("ID");


--
-- TOC entry 3232 (class 2606 OID 27118)
-- Name: cancellation_policies cancellation_policies_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY cancellation_policies
    ADD CONSTRAINT cancellation_policies_pkey PRIMARY KEY (id);


--
-- TOC entry 3220 (class 2606 OID 27108)
-- Name: cancellations cancellations_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY cancellations
    ADD CONSTRAINT cancellations_pkey PRIMARY KEY (id);


--
-- TOC entry 3234 (class 2606 OID 27086)
-- Name: categories_lang categories_lang_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY categories_lang
    ADD CONSTRAINT categories_lang_pkey PRIMARY KEY ("ID");


--
-- TOC entry 3244 (class 2606 OID 27110)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3236 (class 2606 OID 27092)
-- Name: category_type_lang category_type_lang_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY category_type_lang
    ADD CONSTRAINT category_type_lang_pkey PRIMARY KEY ("ID");


--
-- TOC entry 3226 (class 2606 OID 27096)
-- Name: category_type category_type_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY category_type
    ADD CONSTRAINT category_type_pkey PRIMARY KEY (id);


--
-- TOC entry 3240 (class 2606 OID 27094)
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- TOC entry 3238 (class 2606 OID 27122)
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- TOC entry 3258 (class 2606 OID 27242)
-- Name: currencies currencies_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY currencies
    ADD CONSTRAINT currencies_pkey PRIMARY KEY (id);


--
-- TOC entry 3266 (class 2606 OID 27286)
-- Name: features_lang features_lang_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY features_lang
    ADD CONSTRAINT features_lang_pkey PRIMARY KEY ("ID");


--
-- TOC entry 3248 (class 2606 OID 27124)
-- Name: features features_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY features
    ADD CONSTRAINT features_pkey PRIMARY KEY (id);


--
-- TOC entry 3242 (class 2606 OID 27116)
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- TOC entry 3256 (class 2606 OID 27128)
-- Name: medias medias_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY medias
    ADD CONSTRAINT medias_pkey PRIMARY KEY (id);


--
-- TOC entry 3278 (class 2606 OID 27280)
-- Name: order_line_items order_line_items_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY order_line_items
    ADD CONSTRAINT order_line_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3268 (class 2606 OID 27290)
-- Name: booking orders_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY booking
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3274 (class 2606 OID 27294)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- TOC entry 3252 (class 2606 OID 27073)
-- Name: prices prices_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY prices
    ADD CONSTRAINT prices_pkey PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 27064)
-- Name: product_availabilities product_availabilities_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY product_availabilities
    ADD CONSTRAINT product_availabilities_pkey PRIMARY KEY (id);


--
-- TOC entry 3284 (class 2606 OID 27284)
-- Name: product_variants product_variants_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY product_variants
    ADD CONSTRAINT product_variants_pkey PRIMARY KEY (id);


--
-- TOC entry 3254 (class 2606 OID 27082)
-- Name: products_categories products_categories_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY products_categories
    ADD CONSTRAINT products_categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3272 (class 2606 OID 27270)
-- Name: products_features products_features_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY products_features
    ADD CONSTRAINT products_features_pkey PRIMARY KEY (id);


--
-- TOC entry 3260 (class 2606 OID 27292)
-- Name: products_lang products_lang_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY products_lang
    ADD CONSTRAINT products_lang_pkey PRIMARY KEY (id);


--
-- TOC entry 3280 (class 2606 OID 27272)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 3262 (class 2606 OID 27282)
-- Name: regions_lang regions_lang_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY regions_lang
    ADD CONSTRAINT regions_lang_pkey PRIMARY KEY ("ID");


--
-- TOC entry 3276 (class 2606 OID 27276)
-- Name: regions regions_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY regions
    ADD CONSTRAINT regions_pkey PRIMARY KEY (id);


--
-- TOC entry 3224 (class 2606 OID 27114)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 3222 (class 2606 OID 27112)
-- Name: rolemapping rolemapping_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY rolemapping
    ADD CONSTRAINT rolemapping_pkey PRIMARY KEY (id);


--
-- TOC entry 3246 (class 2606 OID 27126)
-- Name: schedule_details schedule_details_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY schedule_details
    ADD CONSTRAINT schedule_details_pkey PRIMARY KEY (id);


--
-- TOC entry 3282 (class 2606 OID 27274)
-- Name: schedules_details_lang schedules_details_lang_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY schedules_details_lang
    ADD CONSTRAINT schedules_details_lang_pkey PRIMARY KEY ("ID");


--
-- TOC entry 3264 (class 2606 OID 27278)
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- TOC entry 3270 (class 2606 OID 27288)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: main; Owner: root
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2017-10-03 19:08:12 +07

--
-- PostgreSQL database dump complete
--

