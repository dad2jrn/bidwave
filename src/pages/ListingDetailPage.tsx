import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useListings } from '../hooks/useListings';
import { formatCurrency } from '../utils/format';
import type { Bid } from '../types';