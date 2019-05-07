/*
 Navicat rootQL Data Transfer

 Source Server         : local
 Source Server Type    : rootQL
 Source Server Version : 90605
 Source Host           : localhost:5432
 Source Catalog        : theasia
 Source Schema         : public

 Target Server Type    : rootQL
 Target Server Version : 90605
 File Encoding         : 65001

 Date: 25/09/2017 22:06:29
*/


DROP SCHEMA IF EXISTS main;
CREATE SCHEMA main;
SET search_path TO main;

-- ----------------------------
-- Table structure for cancellation_policies
-- ----------------------------
DROP TABLE IF EXISTS "cancellation_policies";
CREATE TABLE "cancellation_policies" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "name" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "description" text COLLATE "pg_catalog"."default" DEFAULT NULL
)
;
ALTER TABLE "cancellation_policies" OWNER TO "root";

-- ----------------------------
-- Table structure for cancellations
-- ----------------------------
DROP TABLE IF EXISTS "cancellations";
CREATE TABLE "cancellations" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "order_id" int8 NOT NULL DEFAULT NULL,
  "user_id" int8 NOT NULL DEFAULT NULL,
  "date" timestamp(0) NOT NULL DEFAULT NULL,
  "reason" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL
)
;
ALTER TABLE "cancellations" OWNER TO "root";

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS "categories";
CREATE TABLE "categories" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "category_type_id" int8 NOT NULL DEFAULT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "thumbnail" text COLLATE "pg_catalog"."default" DEFAULT NULL
)
;
ALTER TABLE "categories" OWNER TO "root";

-- ----------------------------
-- Table structure for category_type
-- ----------------------------
DROP TABLE IF EXISTS "category_type";
CREATE TABLE "category_type" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL
)
;
ALTER TABLE "category_type" OWNER TO "root";

-- ----------------------------
-- Table structure for channels
-- ----------------------------
DROP TABLE IF EXISTS "channels";
CREATE TABLE "channels" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL
)
;
ALTER TABLE "channels" OWNER TO "root";

-- ----------------------------
-- Table structure for cities
-- ----------------------------
DROP TABLE IF EXISTS "cities";
CREATE TABLE "cities" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "country_id" int8 NOT NULL DEFAULT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL
)
;
ALTER TABLE "cities" OWNER TO "root";

-- ----------------------------
-- Table structure for countries
-- ----------------------------
DROP TABLE IF EXISTS "countries";
CREATE TABLE "countries" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "region_id" int8 NOT NULL DEFAULT NULL,
  "currency_id" int8 NOT NULL DEFAULT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "language_id" int8 NOT NULL DEFAULT NULL
)
;
ALTER TABLE "countries" OWNER TO "root";

-- ----------------------------
-- Table structure for currencies
-- ----------------------------
DROP TABLE IF EXISTS "currencies";
CREATE TABLE "currencies" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "currency_code" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "currency_symbol" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL
)
;
ALTER TABLE "currencies" OWNER TO "root";

-- ----------------------------
-- Table structure for features
-- ----------------------------
DROP TABLE IF EXISTS "features";
CREATE TABLE "features" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "icon_url" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "type" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL
)
;
ALTER TABLE "features" OWNER TO "root";
COMMENT ON COLUMN "features"."type" IS '- detail
- feature';

-- ----------------------------
-- Table structure for guests
-- ----------------------------
DROP TABLE IF EXISTS "guests";
CREATE TABLE "guests" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "order_id" int8 NOT NULL DEFAULT NULL,
  "type" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "quantity" int8 NOT NULL DEFAULT NULL,
  "total" int8 NOT NULL DEFAULT NULL
)
;
ALTER TABLE "guests" OWNER TO "root";
COMMENT ON COLUMN "guests"."type" IS '- adult
- child
- infant';

-- ----------------------------
-- Table structure for languages
-- ----------------------------
DROP TABLE IF EXISTS "languages";
CREATE TABLE "languages" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL
)
;
ALTER TABLE "languages" OWNER TO "root";

-- ----------------------------
-- Table structure for medias
-- ----------------------------
DROP TABLE IF EXISTS "medias";
CREATE TABLE "medias" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "product_id" int8 NOT NULL DEFAULT NULL,
  "url" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "mime_type" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "primary" bool NOT NULL DEFAULT NULL
)
;
ALTER TABLE "medias" OWNER TO "root";

-- ----------------------------
-- Table structure for booking
-- ----------------------------
DROP TABLE IF EXISTS "booking";
CREATE TABLE "booking" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "product_availability_id" int8 NOT NULL DEFAULT NULL,
  "user_id" int8 NOT NULL DEFAULT NULL,
  "boking_method_id" int8 NOT NULL DEFAULT NULL,
  "status" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "total" int8 NOT NULL DEFAULT NULL,
  "special_request" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "booking_date" timestamp(0) NOT NULL DEFAULT NULL,
  "token" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "pickup_place" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "pickup_time" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "flight_number" text COLLATE "pg_catalog"."default" DEFAULT NULL
)
;
ALTER TABLE "booking" OWNER TO "root";
COMMENT ON COLUMN "booking"."status" IS '- pending
- awaiting_confirmation
- awaiting_payment
- confirmed
- rejected
- cancelled
- expired (e.g. visitor leaves without completing the booking)';

-- ----------------------------
-- Table structure for payment_methods
-- ----------------------------
DROP TABLE IF EXISTS "payment_methods";
CREATE TABLE "payment_methods" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "status" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL
)
;
ALTER TABLE "payment_methods" OWNER TO "root";
COMMENT ON COLUMN "payment_methods"."status" IS '- enabled
- disabled';

-- ----------------------------
-- Table structure for payments
-- ----------------------------
DROP TABLE IF EXISTS "payments";
CREATE TABLE "payments" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "user_id" int8 NOT NULL DEFAULT NULL,
  "order_id" int8 NOT NULL DEFAULT NULL,
  "payment_method_id" int8 NOT NULL DEFAULT NULL,
  "currency_id" int8 NOT NULL DEFAULT NULL,
  "payment_date" timestamp(0) NOT NULL DEFAULT NULL,
  "amount" int8 NOT NULL DEFAULT NULL,
  "status" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "response" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL
)
;
ALTER TABLE "payments" OWNER TO "root";
COMMENT ON COLUMN "payments"."status" IS '- confirmed
- failed';

-- ----------------------------
-- Table structure for prices
-- ----------------------------
DROP TABLE IF EXISTS "prices";
CREATE TABLE "prices" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "product_availability_id" int8 NOT NULL DEFAULT NULL,
  "adult_cost" int8 NOT NULL DEFAULT NULL,
  "adult_price" int8 NOT NULL DEFAULT NULL,
  "child_cost" int8 DEFAULT NULL,
  "child_price" int8 DEFAULT NULL,
  "infant_cost" int8 DEFAULT NULL,
  "infant_price" int8 DEFAULT NULL
)
;
ALTER TABLE "prices" OWNER TO "root";

-- ----------------------------
-- Table structure for product_availabilities
-- ----------------------------
DROP TABLE IF EXISTS "product_availabilities";
CREATE TABLE "product_availabilities" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "product_variant_id" int8 NOT NULL DEFAULT NULL,
  "product_availability_parent_id" int8 DEFAULT NULL,
  "cost_currency_id" int8 NOT NULL DEFAULT NULL,
  "date_start" timestamp(0) NOT NULL DEFAULT NULL,
  "date_end" timestamp(0) DEFAULT NULL,
  "stock_available" int8 DEFAULT NULL,
  "stock_reserved" int8 DEFAULT NULL,
  "stock_booked" int8 DEFAULT NULL
)
;
ALTER TABLE "product_availabilities" OWNER TO "root";

-- ----------------------------
-- Table structure for product_variants
-- ----------------------------
DROP TABLE IF EXISTS "product_variants";
CREATE TABLE "product_variants" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "product_id" int8 NOT NULL DEFAULT NULL,
  "active" bool NOT NULL DEFAULT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "schedule_id" int8 DEFAULT NULL
)
;
ALTER TABLE "product_variants" OWNER TO "root";

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS "products";
CREATE TABLE "products" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "author_id" int8 NOT NULL DEFAULT NULL,
  "currency_id" int8 NOT NULL DEFAULT NULL,
  "city_id" int8 NOT NULL DEFAULT NULL,
  "supplier_id" int8 NOT NULL DEFAULT NULL,
  "modified_user_id" int8 DEFAULT NULL,
  "cancellation_policy_id" int8 DEFAULT NULL,
  "sku" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "important_information" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "passport_required" bool DEFAULT NULL,
  "pickup_details" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "seo_description" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "status" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT ''::text,
  "description" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT ''::text,
  "description_short" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "date_created" timestamp(0) NOT NULL DEFAULT NULL,
  "date_modified" timestamp(0) DEFAULT NULL,
  "instant_booking" bool NOT NULL DEFAULT NULL,
  "child_age" int2 DEFAULT NULL,
  "adult_age" int2 DEFAULT NULL,
  "contract_starts" timestamp(0) NOT NULL DEFAULT NULL,
  "contract_ends" timestamp(0) DEFAULT NULL,
  "address" text COLLATE "pg_catalog"."default" DEFAULT NULL
)
;
ALTER TABLE "products" OWNER TO "root";
COMMENT ON COLUMN "products"."status" IS '- draft
- published
- unpublished
- archived';

-- ----------------------------
-- Table structure for products_categories
-- ----------------------------
DROP TABLE IF EXISTS "products_categories";
CREATE TABLE "products_categories" (
  "product_id" int8 NOT NULL DEFAULT NULL,
  "category_id" int8 NOT NULL DEFAULT NULL
)
;
ALTER TABLE "products_categories" OWNER TO "root";

-- ----------------------------
-- Table structure for products_features
-- ----------------------------
DROP TABLE IF EXISTS "products_features";
CREATE TABLE "products_features" (
  "product_id" int8 NOT NULL DEFAULT NULL,
  "feature_id" int8 NOT NULL DEFAULT NULL,
  "status" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "value" text COLLATE "pg_catalog"."default" DEFAULT NULL
)
;
ALTER TABLE "products_features" OWNER TO "root";
COMMENT ON COLUMN "products_features"."status" IS '- included
- excluded

This is because features that aren’t included are not automatically showing as excluded. They will manually set the excluded features as well.';
COMMENT ON COLUMN "products_features"."value" IS 'For the features of the “Detail” type.';

-- ----------------------------
-- Table structure for products_languages
-- ----------------------------
DROP TABLE IF EXISTS "products_languages";
CREATE TABLE "products_languages" (
  "product_id" int8 NOT NULL DEFAULT NULL,
  "language_id" int8 NOT NULL DEFAULT NULL
)
;
ALTER TABLE "products_languages" OWNER TO "root";

-- ----------------------------
-- Table structure for regions
-- ----------------------------
DROP TABLE IF EXISTS "regions";
CREATE TABLE "regions" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL
)
;
ALTER TABLE "regions" OWNER TO "root";

-- ----------------------------
-- Table structure for schedules
-- ----------------------------
DROP TABLE IF EXISTS "schedules";
CREATE TABLE "schedules" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "schedule_content" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL
)
;
ALTER TABLE "schedules" OWNER TO "root";

-- ----------------------------
-- Table structure for suppliers
-- ----------------------------
DROP TABLE IF EXISTS "suppliers";
CREATE TABLE "suppliers" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "user_id" int8 NOT NULL DEFAULT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "date_created" timestamp(0) NOT NULL DEFAULT NULL,
  "phone_number" text COLLATE "pg_catalog"."default" DEFAULT NULL
)
;
ALTER TABLE "suppliers" OWNER TO "root";

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
  "ID" int8 NOT NULL DEFAULT NULL,
  "email" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "password" timestamp(0) NOT NULL DEFAULT NULL,
  "date_created" timestamp(0) NOT NULL DEFAULT NULL,
  "role" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "birthday" timestamp(0) DEFAULT NULL,
  "accept_terms_date" timestamp(0) NOT NULL DEFAULT NULL,
  "first_name" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "last_name" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "country_id" int8 DEFAULT NULL,
  "phone" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "passport_number" text COLLATE "pg_catalog"."default" DEFAULT NULL
)
;
ALTER TABLE "users" OWNER TO "root";
COMMENT ON COLUMN "users"."role" IS '- admin
- customer
- supplier';

-- ----------------------------
-- Primary Key structure for table cancellation_policies
-- ----------------------------
ALTER TABLE "cancellation_policies" ADD CONSTRAINT "cancellation_policies_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table cancellations
-- ----------------------------
ALTER TABLE "cancellations" ADD CONSTRAINT "cancellations_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table categories
-- ----------------------------
ALTER TABLE "categories" ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table category_type
-- ----------------------------
ALTER TABLE "category_type" ADD CONSTRAINT "category_type_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table channels
-- ----------------------------
ALTER TABLE "channels" ADD CONSTRAINT "channels_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table cities
-- ----------------------------
ALTER TABLE "cities" ADD CONSTRAINT "cities_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table countries
-- ----------------------------
ALTER TABLE "countries" ADD CONSTRAINT "countries_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table currencies
-- ----------------------------
ALTER TABLE "currencies" ADD CONSTRAINT "currencies_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table features
-- ----------------------------
ALTER TABLE "features" ADD CONSTRAINT "features_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table guests
-- ----------------------------
ALTER TABLE "guests" ADD CONSTRAINT "guests_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table languages
-- ----------------------------
ALTER TABLE "languages" ADD CONSTRAINT "languages_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table medias
-- ----------------------------
ALTER TABLE "medias" ADD CONSTRAINT "medias_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table booking
-- ----------------------------
ALTER TABLE "booking" ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table payment_methods
-- ----------------------------
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table payments
-- ----------------------------
ALTER TABLE "payments" ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table prices
-- ----------------------------
ALTER TABLE "prices" ADD CONSTRAINT "prices_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table product_availabilities
-- ----------------------------
ALTER TABLE "product_availabilities" ADD CONSTRAINT "product_availabilities_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table product_variants
-- ----------------------------
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table products
-- ----------------------------
ALTER TABLE "products" ADD CONSTRAINT "products_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table regions
-- ----------------------------
ALTER TABLE "regions" ADD CONSTRAINT "regions_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table schedules
-- ----------------------------
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table suppliers
-- ----------------------------
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("ID");

-- ----------------------------
-- Foreign Keys structure for table cancellations
-- ----------------------------
ALTER TABLE "cancellations" ADD CONSTRAINT "cancellations_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "booking" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "cancellations" ADD CONSTRAINT "cancellations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table categories
-- ----------------------------
ALTER TABLE "categories" ADD CONSTRAINT "categories_category_type_id_fkey" FOREIGN KEY ("category_type_id") REFERENCES "category_type" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table cities
-- ----------------------------
ALTER TABLE "cities" ADD CONSTRAINT "cities_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table countries
-- ----------------------------
ALTER TABLE "countries" ADD CONSTRAINT "countries_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "countries" ADD CONSTRAINT "countries_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "countries" ADD CONSTRAINT "countries_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table guests
-- ----------------------------
ALTER TABLE "guests" ADD CONSTRAINT "guests_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "booking" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table medias
-- ----------------------------
ALTER TABLE "medias" ADD CONSTRAINT "medias_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table booking
-- ----------------------------
ALTER TABLE "booking" ADD CONSTRAINT "orders_boking_method_id_fkey" FOREIGN KEY ("boking_method_id") REFERENCES "channels" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "booking" ADD CONSTRAINT "orders_product_availability_id_fkey" FOREIGN KEY ("product_availability_id") REFERENCES "product_availabilities" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "booking" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table payments
-- ----------------------------
ALTER TABLE "payments" ADD CONSTRAINT "payments_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "booking" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "payments" ADD CONSTRAINT "payments_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table prices
-- ----------------------------
ALTER TABLE "prices" ADD CONSTRAINT "prices_product_availability_id_fkey" FOREIGN KEY ("product_availability_id") REFERENCES "product_availabilities" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product_availabilities
-- ----------------------------
ALTER TABLE "product_availabilities" ADD CONSTRAINT "product_availabilities_cost_currency_id_fkey" FOREIGN KEY ("cost_currency_id") REFERENCES "currencies" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "product_availabilities" ADD CONSTRAINT "product_availabilities_product_availability_parent_id_fkey" FOREIGN KEY ("product_availability_parent_id") REFERENCES "product_availabilities" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "product_availabilities" ADD CONSTRAINT "product_availabilities_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product_variants
-- ----------------------------
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table products
-- ----------------------------
ALTER TABLE "products" ADD CONSTRAINT "products_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products" ADD CONSTRAINT "products_cancellation_policy_id_fkey" FOREIGN KEY ("cancellation_policy_id") REFERENCES "cancellation_policies" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products" ADD CONSTRAINT "products_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products" ADD CONSTRAINT "products_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products" ADD CONSTRAINT "products_modified_user_id_fkey" FOREIGN KEY ("modified_user_id") REFERENCES "users" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products" ADD CONSTRAINT "products_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table products_categories
-- ----------------------------
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table products_features
-- ----------------------------
ALTER TABLE "products_features" ADD CONSTRAINT "products_features_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "features" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products_features" ADD CONSTRAINT "products_features_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table products_languages
-- ----------------------------
ALTER TABLE "products_languages" ADD CONSTRAINT "products_languages_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products_languages" ADD CONSTRAINT "products_languages_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table suppliers
-- ----------------------------
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;
