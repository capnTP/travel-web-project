DROP SCHEMA IF EXISTS main;
CREATE SCHEMA main;
SET search_path TO main;

CREATE TABLE "cancellation_policies" (
"id" int8 NOT NULL,
"name" varchar COLLATE "default" NOT NULL,
"description" text COLLATE "default",
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "cancellation_policies_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "cancellation_policies" OWNER TO "postgres";

CREATE TABLE "cancellations" (
"id" int8 NOT NULL,
"reason" text COLLATE "default" NOT NULL,
"order_id" int8 NOT NULL,
"user_id" int8 NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "cancellations_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "cancellations" OWNER TO "postgres";

CREATE TABLE "categories" (
"id" int8 NOT NULL,
"name" varchar COLLATE "default" NOT NULL,
"image_url" varchar COLLATE "default",
"category_type_id" int8 NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "categories" OWNER TO "postgres";

CREATE TABLE "category_type" (
"id" int8 NOT NULL,
"name" varchar COLLATE "default" NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "category_type_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "category_type" OWNER TO "postgres";

CREATE TABLE "booking_methods" (
"id" int8 NOT NULL,
"name" varchar COLLATE "default" NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "booking_methods" OWNER TO "postgres";

CREATE TABLE "cities" (
"id" int8 NOT NULL,
"name" varchar COLLATE "default" NOT NULL,
"country_id" int8 NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "cities" OWNER TO "postgres";

CREATE TABLE "countries" (
"id" int8 NOT NULL,
"name" varchar COLLATE "default" NOT NULL,
"region_id" int8 NOT NULL,
"currency_id" int8 NOT NULL,
"language_id" int8 NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "countries" OWNER TO "postgres";

CREATE TABLE "currencies" (
"id" int8 NOT NULL,
"currency_code" varchar COLLATE "default" NOT NULL,
"currency_symbol" varchar COLLATE "default" NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "currencies" OWNER TO "postgres";

CREATE TABLE "features" (
"id" int8 NOT NULL,
"icon_url" varchar COLLATE "default",
"name" varchar COLLATE "default" NOT NULL,
"type" varchar COLLATE "default" NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "features_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

COMMENT ON COLUMN "features"."type" IS '- detail
- feature';
ALTER TABLE "features" OWNER TO "postgres";

CREATE TABLE "order_line_items" (
"id" int8 NOT NULL,
"item_type" varchar COLLATE "default" NOT NULL,
"price_per_unit" float8 NOT NULL,
"quantity" int8 NOT NULL,
"total" float8 NOT NULL,
"order_id" int8 NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

COMMENT ON COLUMN "order_line_items"."item_type" IS '- adult
- child
- infant';
ALTER TABLE "order_line_items" OWNER TO "postgres";

CREATE TABLE "languages" (
"id" int8 NOT NULL,
"name" varchar COLLATE "default" NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "languages" OWNER TO "postgres";

CREATE TABLE "medias" (
"id" int8 NOT NULL,
"url" varchar COLLATE "default" NOT NULL,
"mime_type" varchar COLLATE "default" NOT NULL,
"is_primary" bool NOT NULL,
"product_id" int8 NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "medias" OWNER TO "postgres";

CREATE TABLE "booking" (
"id" int8 NOT NULL,
"status" varchar COLLATE "default" NOT NULL,
"total" float8 NOT NULL,
"special_request" text COLLATE "default",
"access_token" varchar COLLATE "default",
"pickup_place" varchar COLLATE "default",
"pickup_time" varchar COLLATE "default",
"flight_number" varchar COLLATE "default",
"confirmed_at" timestamp(255),
"booking_method_id" int8 NOT NULL,
"product_availability_id" int8 NOT NULL,
"user_id" int8 NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

COMMENT ON COLUMN "booking"."status" IS '- pending
- awaiting_confirmation
- awaiting_payment
- confirmed
- rejected
- cancelled
- expired (e.g. visitor leaves without completing the booking)';
ALTER TABLE "booking" OWNER TO "postgres";

CREATE TABLE "payment_methods" (
"id" int8 NOT NULL,
"name" varchar COLLATE "default" NOT NULL,
"status" varchar COLLATE "default" NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

COMMENT ON COLUMN "payment_methods"."status" IS '- enabled
- disabled';
ALTER TABLE "payment_methods" OWNER TO "postgres";

CREATE TABLE "payments" (
"id" int8 NOT NULL,
"total" float8 NOT NULL,
"exchange_rate" float8 NOT NULL DEFAULT 1,
"status" varchar COLLATE "default" NOT NULL,
"response" text COLLATE "default" NOT NULL,
"external_transaction_id" varchar,
"user_id" int8 NOT NULL,
"order_id" int8 NOT NULL,
"payment_method_id" int8 NOT NULL,
"currency_id" int8 NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

COMMENT ON COLUMN "payments"."status" IS '- confirmed
- failed';
ALTER TABLE "payments" OWNER TO "postgres";

CREATE TABLE "prices" (
"id" int8 NOT NULL,
"product_availability_id" int8 NOT NULL,
"adult_price" float8 NOT NULL,
"child_price" float8,
"infant_price" float8,
"adult_cost" float8 NOT NULL,
"child_cost" float8,
"infant_cost" float8,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "prices" OWNER TO "postgres";

CREATE TABLE "product_availabilities" (
"id" int8 NOT NULL,
"starts_on" date NOT NULL DEFAULT NULL::timestamp without time zone,
"ends_on" date DEFAULT NULL::timestamp without time zone,
"stock_available_qty" int8,
"stock_reserved_qty" int8,
"stock_booked_qty" int8,
"product_variant_id" int8 NOT NULL,
"product_availability_parent_id" int8,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "product_availabilities_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "product_availabilities" OWNER TO "postgres";

CREATE TABLE "product_variants" (
"id" int8 NOT NULL,
"name" varchar COLLATE "default" NOT NULL,
"status" varchar NOT NULL,
"product_id" int8 NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "product_variants" OWNER TO "postgres";

CREATE TABLE "products" (
"id" int8 NOT NULL,
"name" varchar COLLATE "default" NOT NULL DEFAULT ''::text,
"description" text COLLATE "default" NOT NULL DEFAULT ''::text,
"short_description" text COLLATE "default" NOT NULL,
"status" varchar COLLATE "default" NOT NULL,
"is_featured" bool NOT NULL DEFAULT false,
"is_passport_required" bool NOT NULL DEFAULT false,
"is_pickup_detail_required" bool NOT NULL DEFAULT false,
"contract_starts_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"contract_ends_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
"sku" varchar COLLATE "default",
"seo_description" text COLLATE "default",
"address" varchar COLLATE "default",
"pickup_details" text COLLATE "default",
"important_information" text COLLATE "default",
"minimum_adult_age" int2,
"minimum_child_age" int2,
"author_id" int8 NOT NULL,
"currency_id" int8 NOT NULL,
"city_id" int8 NOT NULL,
"supplier_id" int8 NOT NULL,
"modified_user_id" int8,
"cancellation_policy_id" int8,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "products_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

COMMENT ON COLUMN "products"."status" IS '- draft
- published
- unpublished
- archived';
ALTER TABLE "products" OWNER TO "postgres";

CREATE TABLE "products_categories" (
"id" int8 NOT NULL,
"product_id" int8 NOT NULL,
"category_id" int8 NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "products_categories" OWNER TO "postgres";

CREATE TABLE "products_features" (
"id" int8 NOT NULL,
"status" varchar COLLATE "default",
"value" varchar COLLATE "default",
"product_id" int8 NOT NULL,
"feature_id" int8 NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
PRIMARY KEY ("id")
)
WITHOUT OIDS;

COMMENT ON COLUMN "products_features"."status" IS '- included
- excluded

This is because features that aren’t included are not automatically showing as excluded. They will manually set the excluded features as well.';
COMMENT ON COLUMN "products_features"."value" IS 'For the features of the “Detail” type.';
ALTER TABLE "products_features" OWNER TO "postgres";

CREATE TABLE "products_languages" (
"id" int8 NOT NULL,
"product_id" int8 NOT NULL,
"language_id" int8 NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "products_languages" OWNER TO "postgres";

CREATE TABLE "regions" (
"id" int8 NOT NULL,
"name" varchar COLLATE "default" NOT NULL,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "regions" OWNER TO "postgres";

CREATE TABLE "schedule_details" (
"id" int8 NOT NULL,
"content" text COLLATE "default" NOT NULL,
"display_order" int4 NOT NULL,
"image_url" varchar(255),
"product_variant_id" int4,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "schedule_details" OWNER TO "postgres";

CREATE TABLE "suppliers" (
"id" int8 NOT NULL,
"name" varchar COLLATE "default" NOT NULL,
"phone_number" varchar COLLATE "default",
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "suppliers" OWNER TO "postgres";

CREATE TABLE "users" (
"id" int8 NOT NULL,
"email" varchar COLLATE "default" NOT NULL,
"password" varchar COLLATE "default" NOT NULL,
"terms_accepted_at" date NOT NULL,
"first_name" varchar COLLATE "default",
"last_name" varchar COLLATE "default",
"birthday" date DEFAULT NULL::timestamp without time zone,
"passport_number" varchar COLLATE "default",
"phone" varchar COLLATE "default",
"country_id" int8,
"supplier_id" int8,
"created_at" timestamp(0) NOT NULL DEFAULT NULL::timestamp without time zone,
"updated_at" timestamp(0) DEFAULT NULL::timestamp without time zone,
CONSTRAINT "users_pkey" PRIMARY KEY ("id")
)
WITHOUT OIDS;

ALTER TABLE "users" OWNER TO "postgres";


ALTER TABLE "cancellations" ADD CONSTRAINT "cancellations_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "booking" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "cancellations" ADD CONSTRAINT "cancellations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "categories" ADD CONSTRAINT "categories_category_type_id_fkey" FOREIGN KEY ("category_type_id") REFERENCES "category_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "cities" ADD CONSTRAINT "cities_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "countries" ADD CONSTRAINT "countries_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "countries" ADD CONSTRAINT "countries_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "countries" ADD CONSTRAINT "countries_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "order_line_items" ADD CONSTRAINT "guests_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "booking" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "medias" ADD CONSTRAINT "medias_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "booking" ADD CONSTRAINT "orders_boking_method_id_fkey" FOREIGN KEY ("booking_method_id") REFERENCES "booking_methods" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "booking" ADD CONSTRAINT "orders_product_availability_id_fkey" FOREIGN KEY ("product_availability_id") REFERENCES "product_availabilities" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "booking" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "payments" ADD CONSTRAINT "payments_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "booking" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "payments" ADD CONSTRAINT "payments_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "prices" ADD CONSTRAINT "prices_product_availability_id_fkey" FOREIGN KEY ("product_availability_id") REFERENCES "product_availabilities" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "product_availabilities" ADD CONSTRAINT "product_availabilities_product_availability_parent_id_fkey" FOREIGN KEY ("product_availability_parent_id") REFERENCES "product_availabilities" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "product_availabilities" ADD CONSTRAINT "product_availabilities_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products" ADD CONSTRAINT "products_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products" ADD CONSTRAINT "products_cancellation_policy_id_fkey" FOREIGN KEY ("cancellation_policy_id") REFERENCES "cancellation_policies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products" ADD CONSTRAINT "products_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products" ADD CONSTRAINT "products_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products" ADD CONSTRAINT "products_modified_user_id_fkey" FOREIGN KEY ("modified_user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products" ADD CONSTRAINT "products_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products_features" ADD CONSTRAINT "products_features_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "features" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products_features" ADD CONSTRAINT "products_features_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products_languages" ADD CONSTRAINT "products_languages_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products_languages" ADD CONSTRAINT "products_languages_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "schedule_details" ADD CONSTRAINT "fk_schedule_details_product_variants_1" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants" ("id");
ALTER TABLE "users" ADD CONSTRAINT "fk_users_suppliers_1" FOREIGN KEY ("supplier_id") REFERENCES "suppliers" ("id");
ALTER TABLE "users" ADD CONSTRAINT "fk_users_countries_1" FOREIGN KEY ("country_id") REFERENCES "countries" ("id");
