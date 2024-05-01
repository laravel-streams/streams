import './bootstrap';
import '../scss/app.scss';
import 'tippy.js/dist/tippy.css';

import { Alpine } from '../../vendor/livewire/livewire/dist/livewire.esm';

import Tooltip from "@ryangjchandler/alpine-tooltip";
import Mousetrap from '@danharrin/alpine-mousetrap';

Alpine.plugin(Tooltip);
Alpine.plugin(Mousetrap);
