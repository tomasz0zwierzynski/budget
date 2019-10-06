PGDMP     5                	    w        	   budget-db    12.0    12.0 2    ;           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            <           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            =           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            >           1262    16393 	   budget-db    DATABASE     �   CREATE DATABASE "budget-db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE "budget-db";
                postgres    false            �            1259    16394    budgets    TABLE     |   CREATE TABLE public.budgets (
    id bigint NOT NULL,
    userid bigint NOT NULL,
    month time with time zone NOT NULL
);
    DROP TABLE public.budgets;
       public         heap    postgres    false            �            1259    16400    users    TABLE     �   CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(32) NOT NULL,
    password character varying NOT NULL,
    display character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16403    budgets_id_seq    SEQUENCE     w   CREATE SEQUENCE public.budgets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.budgets_id_seq;
       public          postgres    false    204            ?           0    0    budgets_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.budgets_id_seq OWNED BY public.users.id;
          public          postgres    false    205            �            1259    16439    budgets_id_seq1    SEQUENCE     x   CREATE SEQUENCE public.budgets_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.budgets_id_seq1;
       public          postgres    false    202            @           0    0    budgets_id_seq1    SEQUENCE OWNED BY     B   ALTER SEQUENCE public.budgets_id_seq1 OWNED BY public.budgets.id;
          public          postgres    false    208            �            1259    16445    budgets_userid_seq    SEQUENCE     {   CREATE SEQUENCE public.budgets_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.budgets_userid_seq;
       public          postgres    false    202            A           0    0    budgets_userid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.budgets_userid_seq OWNED BY public.budgets.userid;
          public          postgres    false    209            �            1259    16463 	   positions    TABLE     �   CREATE TABLE public.positions (
    id bigint NOT NULL,
    title character varying NOT NULL,
    description character varying,
    budgetid bigint NOT NULL,
    planned integer NOT NULL,
    actual integer NOT NULL
);
    DROP TABLE public.positions;
       public         heap    postgres    false            �            1259    16461    positions_budgetid_seq    SEQUENCE        CREATE SEQUENCE public.positions_budgetid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.positions_budgetid_seq;
       public          postgres    false    212            B           0    0    positions_budgetid_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.positions_budgetid_seq OWNED BY public.positions.budgetid;
          public          postgres    false    211            �            1259    16459    positions_id_seq    SEQUENCE     y   CREATE SEQUENCE public.positions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.positions_id_seq;
       public          postgres    false    212            C           0    0    positions_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.positions_id_seq OWNED BY public.positions.id;
          public          postgres    false    210            �            1259    16397    subscriptions    TABLE     �   CREATE TABLE public.subscriptions (
    id bigint NOT NULL,
    userid bigint NOT NULL,
    title character varying NOT NULL,
    description character varying,
    quantity integer NOT NULL,
    active boolean NOT NULL
);
 !   DROP TABLE public.subscriptions;
       public         heap    postgres    false            �            1259    16416    subscribtions_id_seq    SEQUENCE     }   CREATE SEQUENCE public.subscribtions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.subscribtions_id_seq;
       public          postgres    false    203            D           0    0    subscribtions_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.subscribtions_id_seq OWNED BY public.subscriptions.id;
          public          postgres    false    206            �            1259    16422    subscribtions_userid_seq    SEQUENCE     �   CREATE SEQUENCE public.subscribtions_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.subscribtions_userid_seq;
       public          postgres    false    203            E           0    0    subscribtions_userid_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.subscribtions_userid_seq OWNED BY public.subscriptions.userid;
          public          postgres    false    207            �
           2604    16441 
   budgets id    DEFAULT     i   ALTER TABLE ONLY public.budgets ALTER COLUMN id SET DEFAULT nextval('public.budgets_id_seq1'::regclass);
 9   ALTER TABLE public.budgets ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    202            �
           2604    16447    budgets userid    DEFAULT     p   ALTER TABLE ONLY public.budgets ALTER COLUMN userid SET DEFAULT nextval('public.budgets_userid_seq'::regclass);
 =   ALTER TABLE public.budgets ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    209    202            �
           2604    16466    positions id    DEFAULT     l   ALTER TABLE ONLY public.positions ALTER COLUMN id SET DEFAULT nextval('public.positions_id_seq'::regclass);
 ;   ALTER TABLE public.positions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    210    212            �
           2604    16467    positions budgetid    DEFAULT     x   ALTER TABLE ONLY public.positions ALTER COLUMN budgetid SET DEFAULT nextval('public.positions_budgetid_seq'::regclass);
 A   ALTER TABLE public.positions ALTER COLUMN budgetid DROP DEFAULT;
       public          postgres    false    212    211    212            �
           2604    16418    subscriptions id    DEFAULT     t   ALTER TABLE ONLY public.subscriptions ALTER COLUMN id SET DEFAULT nextval('public.subscribtions_id_seq'::regclass);
 ?   ALTER TABLE public.subscriptions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    203            �
           2604    16424    subscriptions userid    DEFAULT     |   ALTER TABLE ONLY public.subscriptions ALTER COLUMN userid SET DEFAULT nextval('public.subscribtions_userid_seq'::regclass);
 C   ALTER TABLE public.subscriptions ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    207    203            �
           2604    16405    users id    DEFAULT     f   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.budgets_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204            .          0    16394    budgets 
   TABLE DATA           4   COPY public.budgets (id, userid, month) FROM stdin;
    public          postgres    false    202   Z6       8          0    16463 	   positions 
   TABLE DATA           V   COPY public.positions (id, title, description, budgetid, planned, actual) FROM stdin;
    public          postgres    false    212   w6       /          0    16397    subscriptions 
   TABLE DATA           Y   COPY public.subscriptions (id, userid, title, description, quantity, active) FROM stdin;
    public          postgres    false    203   �6       0          0    16400    users 
   TABLE DATA           @   COPY public.users (id, username, password, display) FROM stdin;
    public          postgres    false    204   �6       F           0    0    budgets_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.budgets_id_seq', 1, false);
          public          postgres    false    205            G           0    0    budgets_id_seq1    SEQUENCE SET     >   SELECT pg_catalog.setval('public.budgets_id_seq1', 1, false);
          public          postgres    false    208            H           0    0    budgets_userid_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.budgets_userid_seq', 1, false);
          public          postgres    false    209            I           0    0    positions_budgetid_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.positions_budgetid_seq', 1, false);
          public          postgres    false    211            J           0    0    positions_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.positions_id_seq', 1, false);
          public          postgres    false    210            K           0    0    subscribtions_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.subscribtions_id_seq', 1, false);
          public          postgres    false    206            L           0    0    subscribtions_userid_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.subscribtions_userid_seq', 1, false);
          public          postgres    false    207            �
           2606    16452    budgets PK_budgets 
   CONSTRAINT     R   ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT "PK_budgets" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.budgets DROP CONSTRAINT "PK_budgets";
       public            postgres    false    202            �
           2606    16429    subscriptions PK_subscriptions 
   CONSTRAINT     ^   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT "PK_subscriptions" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT "PK_subscriptions";
       public            postgres    false    203            �
           2606    16410    users PK_users 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_users" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_users";
       public            postgres    false    204            �
           2606    16412    users UNIQUE_users_username 
   CONSTRAINT     \   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UNIQUE_users_username" UNIQUE (username);
 G   ALTER TABLE ONLY public.users DROP CONSTRAINT "UNIQUE_users_username";
       public            postgres    false    204            �
           2606    16472    positions positions_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.positions DROP CONSTRAINT positions_pkey;
       public            postgres    false    212            �
           1259    16435    fki_FK_subscriptions_users    INDEX     X   CREATE INDEX "fki_FK_subscriptions_users" ON public.subscriptions USING btree (userid);
 0   DROP INDEX public."fki_FK_subscriptions_users";
       public            postgres    false    203            �
           1259    16458 
   fki_userid    INDEX     @   CREATE INDEX fki_userid ON public.budgets USING btree (userid);
    DROP INDEX public.fki_userid;
       public            postgres    false    202            �
           2606    16473    positions FK_positions_budgets    FK CONSTRAINT     |   ALTER TABLE ONLY public.positions
    ADD CONSTRAINT "FK_positions_budgets" FOREIGN KEY (id) REFERENCES public.budgets(id);
 J   ALTER TABLE ONLY public.positions DROP CONSTRAINT "FK_positions_budgets";
       public          postgres    false    2722    212    202            �
           2606    16430 $   subscriptions FK_subscriptions_users    FK CONSTRAINT     �   ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT "FK_subscriptions_users" FOREIGN KEY (userid) REFERENCES public.users(id);
 P   ALTER TABLE ONLY public.subscriptions DROP CONSTRAINT "FK_subscriptions_users";
       public          postgres    false    2728    203    204            �
           2606    16453    budgets userid    FK CONSTRAINT     l   ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT userid FOREIGN KEY (userid) REFERENCES public.users(id);
 8   ALTER TABLE ONLY public.budgets DROP CONSTRAINT userid;
       public          postgres    false    202    204    2728            .      x������ � �      8      x������ � �      /      x������ � �      0      x������ � �     