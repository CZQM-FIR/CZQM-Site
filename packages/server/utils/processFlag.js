/* eslint-disable no-param-reassign */
const processFlag = (incommingFlag, flags) => {
    let returnFlags = flags
    switch (incommingFlag) {
        case 'roster-gnd-cert':
            // if user has gnd-sup, remove it and add gnd-cert
            if (returnFlags.includes('roster-gnd-sup')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-gnd-sup')
                returnFlags.push('roster-gnd-cert')
                break;
            }
            // if user has gnd-cert, remove it
            if (returnFlags.includes('roster-gnd-cert')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-gnd-cert')
                break;
            }
            // if user has neither, add gnd-cert
            returnFlags.push('roster-gnd-cert')
            break;
        case 'roster-gnd-sup':
            
            // if user has gnd-cert, remove it and add gnd-sup
            if (returnFlags.includes('roster-gnd-cert')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-gnd-cert')
                returnFlags.push('roster-gnd-sup')
                break;
            }
            // if user has gnd-sup, remove it
            if (returnFlags.includes('roster-gnd-sup')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-gnd-sup')
                break;
            }
            // if user has neither, add gnd-sup
            returnFlags.push('roster-gnd-sup')
        break;
        
        case 'roster-twr-cert':
            // if user has twr-sup or twr-solo, remove it and add twr-cert
            if (returnFlags.includes('roster-twr-sup') || returnFlags.includes('roster-twr-solo')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-twr-sup')
                returnFlags = returnFlags.filter(flag => flag !== 'roster-twr-solo')
                returnFlags.push('roster-twr-cert')
                break;
            }

            // if user has twr-cert, remove it
            if (returnFlags.includes('roster-twr-cert')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-twr-cert')
                break;
            }

            // if user has neither, add twr-cert
            returnFlags.push('roster-twr-cert')
            break;
        
        case 'roster-twr-solo':
            // if user has twr-sup or twr-cert, remove it and add twr-solo
            if (returnFlags.includes('roster-twr-sup') || returnFlags.includes('roster-twr-cert')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-twr-sup')
                returnFlags = returnFlags.filter(flag => flag !== 'roster-twr-cert')
                returnFlags.push('roster-twr-solo')
                break;
            }

            // if user has twr-solo, remove it
            if (returnFlags.includes('roster-twr-solo')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-twr-solo')
                break;
            }

            // if user has neither, add twr-solo
            returnFlags.push('roster-twr-solo')
            break;

        case 'roster-twr-sup':
            // if user has twr-cert or twr-solo, remove it and add twr-sup
            if (returnFlags.includes('roster-twr-cert') || returnFlags.includes('roster-twr-solo')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-twr-cert')
                returnFlags = returnFlags.filter(flag => flag !== 'roster-twr-solo')
                returnFlags.push('roster-twr-sup')
                break;
            }

            // if user has twr-sup, remove it
            if (returnFlags.includes('roster-twr-sup')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-twr-sup')
                break;
            }

            // if user has neither, add twr-sup
            returnFlags.push('roster-twr-sup')
            break;

        case 'roster-app-cert':
            // if user has app-sup or app-solo, remove it and add app-cert
            if (returnFlags.includes('roster-app-sup') || returnFlags.includes('roster-app-solo')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-app-sup')
                returnFlags = returnFlags.filter(flag => flag !== 'roster-app-solo')
                returnFlags.push('roster-app-cert')
                break;
            }

            // if user has app-cert, remove it
            if (returnFlags.includes('roster-app-cert')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-app-cert')
                break;
            }

            // if user has neither, add app-cert
            returnFlags.push('roster-app-cert')
            break;

        case 'roster-app-solo':
            // if user has app-cert or app-sup, remove it and add app-solo
            if (returnFlags.includes('roster-app-cert') || returnFlags.includes('roster-app-sup')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-app-cert')
                returnFlags = returnFlags.filter(flag => flag !== 'roster-app-sup')
                returnFlags.push('roster-app-solo')
                break;
            }

            // if user has app-solo, remove it
            if (returnFlags.includes('roster-app-solo')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-app-solo')
                break;
            }

            // if user has neither, add app-solo
            returnFlags.push('roster-app-solo')
            break;
        
        case 'roster-app-sup':
            // if user has app-cert or app-solo, remove it and add app-sup
            if (returnFlags.includes('roster-app-cert') || returnFlags.includes('roster-app-solo')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-app-cert')
                returnFlags = returnFlags.filter(flag => flag !== 'roster-app-solo')
                returnFlags.push('roster-app-sup')
                break;
            }

            // if user has app-sup, remove it
            if (returnFlags.includes('roster-app-sup')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-app-sup')
                break;
            }

            // if user has neither, add app-sup
            returnFlags.push('roster-app-sup')
            break;

        
        case 'roster-ctr-cert':
            // if user has ctr-sup or ctr-solo, remove it and add ctr-cert
            if (returnFlags.includes('roster-ctr-sup') || returnFlags.includes('roster-ctr-solo')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-ctr-sup')
                returnFlags = returnFlags.filter(flag => flag !== 'roster-ctr-solo')
                returnFlags.push('roster-ctr-cert')
                break;
            }

            // if user has ctr-cert, remove it
            if (returnFlags.includes('roster-ctr-cert')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-ctr-cert')
                break;
            }

            // if user has neither, add ctr-cert
            returnFlags.push('roster-ctr-cert')
            break;

        case 'roster-ctr-solo':
            // if user has ctr-cert or ctr-sup, remove it and add ctr-solo
            if (returnFlags.includes('roster-ctr-cert') || returnFlags.includes('roster-ctr-sup')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-ctr-cert')
                returnFlags = returnFlags.filter(flag => flag !== 'roster-ctr-sup')
                returnFlags.push('roster-ctr-solo')
                break;
            }

            // if user has ctr-solo, remove it
            if (returnFlags.includes('roster-ctr-solo')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-ctr-solo')
                break;
            }

            // if user has neither, add ctr-solo
            returnFlags.push('roster-ctr-solo')
            break;

        case 'roster-ctr-sup':
            // if user has ctr-cert or ctr-solo, remove it and add ctr-sup
            if (returnFlags.includes('roster-ctr-cert') || returnFlags.includes('roster-ctr-solo')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-ctr-cert')
                returnFlags = returnFlags.filter(flag => flag !== 'roster-ctr-solo')
                returnFlags.push('roster-ctr-sup')
                break;
            }

            // if user has ctr-sup, remove it
            if (returnFlags.includes('roster-ctr-sup')) {
                returnFlags = returnFlags.filter(flag => flag !== 'roster-ctr-sup')
                break;
            }

            // if user has neither, add ctr-sup
            returnFlags.push('roster-ctr-sup')
            break;

            case 'chief':
            case 'deputy':
            case 'chief-instructor':
            case 'web':
            case 'events':
            case 'sector':
                if (returnFlags.includes(incommingFlag)) {
                    returnFlags = returnFlags.filter(flag => flag !== incommingFlag);
                } else {
                    returnFlags.push(incommingFlag);
                }
                if (
                    !returnFlags.includes('chief') &&
                    !returnFlags.includes('deputy') &&
                    !returnFlags.includes('chief-instructor') &&
                    !returnFlags.includes('web') &&
                    !returnFlags.includes('events') &&
                    !returnFlags.includes('sector')
                ) {
                    returnFlags = returnFlags.filter(flag => flag !== 'staff');
                } else if (!returnFlags.includes('staff')) {
                    returnFlags.push('staff');
                }
                break;
        
                case 'instructor':
                case 'mentor':
                    if (returnFlags.includes(incommingFlag)) {
                        returnFlags = returnFlags.filter(f => f !== incommingFlag);
                        if (
                            !returnFlags.includes('instructor') &&
                            !returnFlags.includes('mentor') &&
                            returnFlags.includes('staff-instructing')
                        ) {
                            returnFlags = returnFlags.filter(f => f !== 'staff-instructing');
                        }
                    } else if (
                        returnFlags.includes('instructor') ||
                        returnFlags.includes('mentor') ||
                        !returnFlags.includes('staff-instructing')
                        ) {
                        returnFlags = returnFlags.filter(f => f !== 'instructor');
                        returnFlags = returnFlags.filter(f => f !== 'mentor');
                        if (!returnFlags.includes('staff-instructing')) {
                            returnFlags.push('staff-instructing');
                        }
                        returnFlags.push(incommingFlag);
                    }
                    break;
        
                case 'controller':
                    if (returnFlags.includes('controller')) {
                        returnFlags = returnFlags.filter(f => f !== 'controller');
                    } else {
                        returnFlags = returnFlags.filter(f => f !== 'visitor');
                        returnFlags.push('controller');
                    }
                    break;
                case 'visitor':
                    if (returnFlags.includes('visitor')) {
                        returnFlags = returnFlags.filter(f => f !== 'visitor');
                    } else {
                        returnFlags = returnFlags.filter(f => f !== 'controller');
                        returnFlags.push('visitor');
                    }
                break;
        
                case 'inactive':
                    if (returnFlags.includes('inactive')) {
                        returnFlags = returnFlags.filter(f => f !== 'inactive');
                    } else {
                        returnFlags = returnFlags.filter(f => f !== 'leave');
                        returnFlags.push('inactive');
                    }
                    break;
                case 'leave':
                    if (returnFlags.includes('leave')) {
                        returnFlags = returnFlags.filter(f => f !== 'leave');
                    } else {
                        returnFlags = returnFlags.filter(f => f !== 'inactive');
                        returnFlags.push('leave');
                    }
                    break;

            
                default:
                    if (returnFlags.includes(incommingFlag)) {
                        returnFlags = returnFlags.filter(flag => flag !== incommingFlag)
                    } else {
                        returnFlags.push(incommingFlag)
                    }
                    break;
    }
    
    return returnFlags;
}

module.exports = processFlag