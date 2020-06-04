INSERT INTO players
(
    first_name, 
    last_name, 
    birth_date, 
    current_number, 
    height, 
    birth_city, 
    birth_state, 
    birth_country, 
    image_url
VALUES(
   'michael',
   'bradley',
   07-31-1977,
   22,
   6.2,
   'princeton',
   'nj', 
   'us', 
   'url');

   INSERT INTO players
(
    first_name, 
    last_name, 
    birth_date, 
    weight_in_pounds, 
    height_in_feet, 
    birth_city, 
    birth_state, 
    birth_country, 
    image_url, 
    club_id, 
    coach_id)
VALUES(
   'joe',
   'agent',
   now(),
   175,
   5.10,
   'belmont',
   'md', 
   'us', 
   'url', 
   11, 
   110);

INSERT INTO clubs
(
    "name", 
    icon_url, 
    league_id, 
    stadium_name, 
    city, 
    country, 
    inception
)
VALUES
(
    'Arsenal', 
    'url', 
    1, 
    'Emerites', 
    'London', 
    'UK', 
    1886
);

INSERT INTO clubs
(
    "name", 
    icon_url, 
    league_id, 
    stadium_name, 
    city, 
    country, 
    inception
)
VALUES
(
    'toronto fc',
     'icon url',
     10,
     'bmo field',
     'toronto',
     'ca',
     2007
);

INSERT INTO football_leagues
(
    league_name, 
    inception
)
VALUES(
    'english premiere league', 
    1992
);

INSERT INTO players_coaches
(
    player_id, coach_id
)
VALUES
(
    0, 
    0
);

INSERT INTO coaches
(
    first_name, 
    last_name, 
    birth_date, 
    birth_city, 
    birth_state, 
    birth_country, 
    image_url, 
    current_club_id, 
    years_at_current_club
)
VALUES
(
    'greg', 
    'vanney', 
    '06-11-1974', 
    'south boston',
    'va', 
    'us', 
    'image_url', 
    10,
    7
);

INSERT INTO players_clubs
(
    player_id, 
    club_id, 
    current_club
    )
VALUES
(
    0,
    0, 
    false
);

INSERT INTO coaches_clubs
(
    coach_id, 
    club_id, 
    current_club
    )
VALUES
(
    3, 
    4, 
    true
);

INSERT INTO players_coaches
(
    player_id, 
    coach_id, 
    current_coach
)
VALUES
(
    1, 
    0, 
    false
);

INSERT INTO football_divisions
(
    division_name, 
    football_league_id,
    rank
)
VALUES
(
    'english premier league',
     1,
     1
);
