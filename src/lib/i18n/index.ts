function localizedDate(target: Date | string, type: 'date' | 'date_short' | 'date_medium' | 'date_long' | 'time' | 'datetime' | 'datetime_short' | 'datetime_medium' | 'datetime_long' | 'month_year' = 'datetime') {
    if (!(target instanceof Date)) {
        target = new Date(target);
    }

    if (type === 'date') {
        return target.toLocaleDateString('nl-NL', {
            dateStyle: 'full'
        })
    }
    if (type === 'date_short') {
        return target.toLocaleDateString('nl-NL', {
            dateStyle: 'short'
        })
    }
    if (type === 'date_medium') {
        return target.toLocaleDateString('nl-NL', {
            dateStyle: 'medium'
        })
    }
    if (type === 'date_long') {
        return target.toLocaleDateString('nl-NL', {
            dateStyle: 'long'
        })
    }

    if (type === 'time') {
        return target.toLocaleTimeString('nl-NL', {
            timeStyle: 'short'
        })
    }

    if(type === 'datetime_short'){
        return target.toLocaleString('nl-NL', {
            dateStyle: 'short',
            timeStyle: 'short'
        })
    }

    if(type === 'datetime_medium'){
        return target.toLocaleString('nl-NL', {
            dateStyle: 'medium',
            timeStyle: 'short'
        })
    }

    if(type === 'datetime_long'){
        return target.toLocaleString('nl-NL', {
            dateStyle: 'long',
            timeStyle: 'short'
        })
    }

    if(type === 'month_year'){
        return target.toLocaleString('nl-NL', {
            month: 'long',
            year: 'numeric'
        })
    }

    return target.toLocaleString('nl-NL', {
        dateStyle: 'full',
        timeStyle: 'short'
    })
}


export default {
    date: localizedDate
};