/* eslint-disable no-param-reassign */
const processFlag = (incommingFlag, flags) => {
    switch (incommingFlag) {
        case 'roster-gnd-cert':
            // if user has gnd-sup, remove it and add gnd-cert
            if (flags.includes('roster-gnd-sup')) {
                flags = flags.filter(flag => flag !== 'roster-gnd-sup')
                flags.push('roster-gnd-cert')
                break;
            }
            // if user has gnd-cert, remove it
            if (flags.includes('roster-gnd-cert')) {
                flags = flags.filter(flag => flag !== 'roster-gnd-cert')
                break;
            }
            // if user has neither, add gnd-cert
            flags.push('roster-gnd-cert')
            break;
        case 'roster-gnd-sup':
            
            // if user has gnd-cert, remove it and add gnd-sup
            if (flags.includes('roster-gnd-cert')) {
                flags = flags.filter(flag => flag !== 'roster-gnd-cert')
                flags.push('roster-gnd-sup')
                break;
            }
            // if user has gnd-sup, remove it
            if (flags.includes('roster-gnd-sup')) {
                flags = flags.filter(flag => flag !== 'roster-gnd-sup')
                break;
            }
            // if user has neither, add gnd-sup
            flags.push('roster-gnd-sup')
        break;
        
        case 'roster-twr-cert':
            // if user has twr-sup or twr-solo, remove it and add twr-cert
            if (flags.includes('roster-twr-sup') || flags.includes('roster-twr-solo')) {
                flags = flags.filter(flag => flag !== 'roster-twr-sup')
                flags = flags.filter(flag => flag !== 'roster-twr-solo')
                flags.push('roster-twr-cert')
                break;
            }

            // if user has twr-cert, remove it
            if (flags.includes('roster-twr-cert')) {
                flags = flags.filter(flag => flag !== 'roster-twr-cert')
                break;
            }

            // if user has neither, add twr-cert
            flags.push('roster-twr-cert')
            break;
        
        case 'roster-twr-solo':
            // if user has twr-sup or twr-cert, remove it and add twr-solo
            if (flags.includes('roster-twr-sup') || flags.includes('roster-twr-cert')) {
                flags = flags.filter(flag => flag !== 'roster-twr-sup')
                flags = flags.filter(flag => flag !== 'roster-twr-cert')
                flags.push('roster-twr-solo')
                break;
            }

            // if user has twr-solo, remove it
            if (flags.includes('roster-twr-solo')) {
                flags = flags.filter(flag => flag !== 'roster-twr-solo')
                break;
            }

            // if user has neither, add twr-solo
            flags.push('roster-twr-solo')
            break;

        case 'roster-twr-sup':
            // if user has twr-cert or twr-solo, remove it and add twr-sup
            if (flags.includes('roster-twr-cert') || flags.includes('roster-twr-solo')) {
                flags = flags.filter(flag => flag !== 'roster-twr-cert')
                flags = flags.filter(flag => flag !== 'roster-twr-solo')
                flags.push('roster-twr-sup')
                break;
            }

            // if user has twr-sup, remove it
            if (flags.includes('roster-twr-sup')) {
                flags = flags.filter(flag => flag !== 'roster-twr-sup')
                break;
            }

            // if user has neither, add twr-sup
            flags.push('roster-twr-sup')
            break;

        case 'roster-app-cert':
            // if user has app-sup or app-solo, remove it and add app-cert
            if (flags.includes('roster-app-sup') || flags.includes('roster-app-solo')) {
                flags = flags.filter(flag => flag !== 'roster-app-sup')
                flags = flags.filter(flag => flag !== 'roster-app-solo')
                flags.push('roster-app-cert')
                break;
            }

            // if user has app-cert, remove it
            if (flags.includes('roster-app-cert')) {
                flags = flags.filter(flag => flag !== 'roster-app-cert')
                break;
            }

            // if user has neither, add app-cert
            flags.push('roster-app-cert')
            break;

        case 'roster-app-solo':
            // if user has app-cert or app-sup, remove it and add app-solo
            if (flags.includes('roster-app-cert') || flags.includes('roster-app-sup')) {
                flags = flags.filter(flag => flag !== 'roster-app-cert')
                flags = flags.filter(flag => flag !== 'roster-app-sup')
                flags.push('roster-app-solo')
                break;
            }

            // if user has app-solo, remove it
            if (flags.includes('roster-app-solo')) {
                flags = flags.filter(flag => flag !== 'roster-app-solo')
                break;
            }

            // if user has neither, add app-solo
            flags.push('roster-app-solo')
            break;
        
        case 'roster-app-sup':
            // if user has app-cert or app-solo, remove it and add app-sup
            if (flags.includes('roster-app-cert') || flags.includes('roster-app-solo')) {
                flags = flags.filter(flag => flag !== 'roster-app-cert')
                flags = flags.filter(flag => flag !== 'roster-app-solo')
                flags.push('roster-app-sup')
                break;
            }

            // if user has app-sup, remove it
            if (flags.includes('roster-app-sup')) {
                flags = flags.filter(flag => flag !== 'roster-app-sup')
                break;
            }

            // if user has neither, add app-sup
            flags.push('roster-app-sup')
            break;

        
        case 'roster-ctr-cert':
            // if user has ctr-sup or ctr-solo, remove it and add ctr-cert
            if (flags.includes('roster-ctr-sup') || flags.includes('roster-ctr-solo')) {
                flags = flags.filter(flag => flag !== 'roster-ctr-sup')
                flags = flags.filter(flag => flag !== 'roster-ctr-solo')
                flags.push('roster-ctr-cert')
                break;
            }

            // if user has ctr-cert, remove it
            if (flags.includes('roster-ctr-cert')) {
                flags = flags.filter(flag => flag !== 'roster-ctr-cert')
                break;
            }

            // if user has neither, add ctr-cert
            flags.push('roster-ctr-cert')
            break;

        case 'roster-ctr-solo':
            // if user has ctr-cert or ctr-sup, remove it and add ctr-solo
            if (flags.includes('roster-ctr-cert') || flags.includes('roster-ctr-sup')) {
                flags = flags.filter(flag => flag !== 'roster-ctr-cert')
                flags = flags.filter(flag => flag !== 'roster-ctr-sup')
                flags.push('roster-ctr-solo')
                break;
            }

            // if user has ctr-solo, remove it
            if (flags.includes('roster-ctr-solo')) {
                flags = flags.filter(flag => flag !== 'roster-ctr-solo')
                break;
            }

            // if user has neither, add ctr-solo
            flags.push('roster-ctr-solo')
            break;

        case 'roster-ctr-sup':
            // if user has ctr-cert or ctr-solo, remove it and add ctr-sup
            if (flags.includes('roster-ctr-cert') || flags.includes('roster-ctr-solo')) {
                flags = flags.filter(flag => flag !== 'roster-ctr-cert')
                flags = flags.filter(flag => flag !== 'roster-ctr-solo')
                flags.push('roster-ctr-sup')
                break;
            }

            // if user has ctr-sup, remove it
            if (flags.includes('roster-ctr-sup')) {
                flags = flags.filter(flag => flag !== 'roster-ctr-sup')
                break;
            }

            // if user has neither, add ctr-sup
            flags.push('roster-ctr-sup')
            break;

            case 'chief':
            case 'deputy':
            case 'chief-instructor':
            case 'web':
            case 'events':
            case 'sector':
                if (flags.includes(incommingFlag)) {
                    flags = flags.filter(flag => flag !== incommingFlag);
                } else {
                    flags.push(incommingFlag);
                }
                if (
                    !flags.includes('chief') &&
                    !flags.includes('deputy') &&
                    !flags.includes('chief-instructor') &&
                    !flags.includes('web') &&
                    !flags.includes('events') &&
                    !flags.includes('sector')
                ) {
                    flags = flags.filter(flag => flag !== 'staff');
                } else if (!flags.includes('staff')) {
                    flags.push('staff');
                }
                break;
        
                case 'instructor':
                case 'mentor':
                    if (flags.includes(incommingFlag)) {
                        flags = flags.filter(f => f !== incommingFlag);
                        if (
                            !flags.includes('instructor') &&
                            !flags.includes('mentor') &&
                            flags.includes('staff-instructing')
                        ) {
                            flags = flags.filter(f => f !== 'staff-instructing');
                        }
                    } else if (
                        flags.includes('instructor') ||
                        flags.includes('mentor') ||
                        !flags.includes('staff-instructing')
                        ) {
                        flags = flags.filter(f => f !== 'instructor');
                        flags = flags.filter(f => f !== 'mentor');
                        if (!flags.includes('staff-instructing')) {
                            flags.push('staff-instructing');
                        }
                        flags.push(incommingFlag);
                    }
                    break;
        
                case 'controller':
                    if (flags.includes('controller')) {
                        flags = flags.filter(f => f !== 'controller');
                    } else {
                        flags = flags.filter(f => f !== 'visitor');
                        flags.push('controller');
                    }
                    break;
                case 'visitor':
                    if (flags.includes('visitor')) {
                        flags = flags.filter(f => f !== 'visitor');
                    } else {
                        flags = flags.filter(f => f !== 'controller');
                        flags.push('visitor');
                    }
                break;
        
                case 'inactive':
                    if (flags.includes('inactive')) {
                        flags = flags.filter(f => f !== 'inactive');
                    } else {
                        flags = flags.filter(f => f !== 'leave');
                        flags.push('inactive');
                    }
                    break;
                case 'leave':
                    if (flags.includes('leave')) {
                        flags = flags.filter(f => f !== 'leave');
                    } else {
                        flags = flags.filter(f => f !== 'inactive');
                        flags.push('leave');
                    }
                    break;

            
                default:
                    if (flags.includes(incommingFlag)) {
                        flags = flags.filter(flag => flag !== incommingFlag)
                    } else {
                        flags.push(incommingFlag)
                    }
                    break;
        }
}

module.exports = processFlag