import { Chip, Fab, Typography, CardMedia, Stack, Box } from '@mui/material';
import { Car, range } from '../api/CatalogAPI';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteIconOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import { useState } from 'react';
import { red } from '@mui/material/colors';
import AliceCarousel from 'react-alice-carousel';

import './CatalogCard.css';
import { fNumber } from '../utils/formatNumber';
import _ from 'lodash';

interface CatalogCardProps {
  car: Car;
  horizontal?: boolean;
}

export default function CatalogCard({ car, horizontal }: CatalogCardProps) {
  const description = `${car.brand} ${car.model} ${car.version}`;
  const years = range(car.year);
  const mileage = `${fNumber(car.mileage)} km`;

  const [isFaved, setFaved] = useState(() => {
    const favorites = sessionStorage.getItem('karvi-favorites')?.split(',') || [];
    const isIncluded = favorites.includes(car.id);
    return isIncluded;
  });

  const onClickFavorite = (event: React.KeyboardEvent | React.MouseEvent) => {
    const favorites = sessionStorage.getItem('karvi-favorites')?.split(',') || [];
    const isIncluded = favorites.includes(car.id);
    if (isIncluded) {
      sessionStorage.setItem('karvi-favorites', _.pull(favorites, car.id).join(','));
      setFaved(false);
    } else {
      setFaved(true);
      sessionStorage.setItem('karvi-favorites', favorites.concat(car.id).join(','));
    }
  };

  // HORIZONTAL VERSION
  if (horizontal) {
    return (
      <Stack direction="row" width={395} bgcolor="white" py={2.5} sx={{ borderBottom: '1px solid #E3E5ED' }}>
        <Box position="relative">
          <Box borderRadius={3} overflow="hidden" width={120}>
            <CardMedia component="img" alt={description} src={car.image} height={106} role="presentation" />
          </Box>
          <Box position="absolute" top={8} right={8}>
            <Fab
              aria-label="like"
              style={{
                color: isFaved ? red[500] : '#87899C',

                maxHeight: 28,
                minHeight: 28,
                minWidth: 28,
                maxWidth: 28,
              }}
              onClick={onClickFavorite}
            >
              {isFaved ? (
                <FavoriteIcon sx={{ width: 16, height: 16, lineHeight: 16 }} />
              ) : (
                <FavoriteIconOutlined sx={{ width: 16, height: 16, lineHeight: 16 }} />
              )}
            </Fab>
          </Box>
        </Box>
        <Box pl={1.5}>
          <Stack direction="row" gap={1}>
            {years.map((year) => (
              <Chip key={year} label={year} size="small" />
            ))}

            <Chip label={mileage} size="small" />
          </Stack>
          <Typography pt={1} textTransform="capitalize" variant="body2">
            <Typography component="span" textTransform="capitalize" fontWeight={700} variant="body2">
              {`${car.brand} ${car.model}`.toLowerCase()}
            </Typography>
            <Typography ml={1} component="span" variant="body2">
              {car.version}
            </Typography>
          </Typography>
          <Typography variant="body1" color="secondary">{`R$ ${fNumber(car.price)}`}</Typography>
          <Typography variant="subtitle2">{`${car.city}, ${car.state}`}</Typography>
        </Box>
      </Stack>
    );
    // VERTICAL VERSION
  } else {
    const handleDragStart = (e: React.KeyboardEvent | React.MouseEvent) => e.preventDefault();

    // since there aren't multiple images, we repeat the same image
    const items = [
      <CardMedia
        component="img"
        alt={description}
        src={car.image}
        width={275}
        onDragStart={handleDragStart}
        role="presentation"
      />,
      <CardMedia
        component="img"
        alt={description}
        src={car.image}
        width={275}
        onDragStart={handleDragStart}
        role="presentation"
      />,
      <CardMedia
        component="img"
        alt={description}
        src={car.image}
        width={275}
        onDragStart={handleDragStart}
        role="presentation"
      />,
    ];
    return (
      <Box p={1} className="card" borderRadius={3} overflow="hidden" width={275} bgcolor="white">
        <Box position="relative">
          <Box borderRadius={3} overflow="hidden">
            <AliceCarousel mouseTracking items={items} disableButtonsControls />
          </Box>
          <Box position="absolute" top={8} right={8}>
            <Fab
              aria-label="like"
              style={{
                color: isFaved ? red[500] : '#87899C',

                maxHeight: 28,
                minHeight: 28,
                minWidth: 28,
                maxWidth: 28,
              }}
              onClick={onClickFavorite}
            >
              {isFaved ? (
                <FavoriteIcon sx={{ width: 16, height: 16, lineHeight: 16 }} />
              ) : (
                <FavoriteIconOutlined sx={{ width: 16, height: 16, lineHeight: 16 }} />
              )}
            </Fab>
          </Box>
        </Box>
        <Box p={1}>
          <Stack direction="row" gap={1}>
            {years.map((year) => (
              <Chip key={year} label={year} size="small" />
            ))}

            <Chip label={mileage} size="small" />
          </Stack>
          <Typography textTransform="capitalize" fontWeight={700} variant="body2">
            {`${car.brand} ${car.model}`.toLowerCase()}
          </Typography>
          <Typography minHeight="3em" variant="body2">
            {car.version}
          </Typography>
          <Typography variant="body1" color="secondary">{`R$ ${fNumber(car.price)}`}</Typography>
          <Typography variant="subtitle2">{`${car.city}, ${car.state}`}</Typography>
        </Box>
      </Box>
    );
  }
}
