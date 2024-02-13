// Import global settings
const { resetTxt, boldTxt, settings } = require(`./config`)

// Import data
const { users } = require(`./data`)

// Import helper functions
const { talk } = require(`./utils`)

function useLemon(chatroom, command, username, target) {
    if (settings.debug) { console.log(`${boldTxt}> handleGiveLemon(chatroom: '${chatroom}', command: '${command}', username: '${username}', target: '${target}')${resetTxt}`) }
    const user = users[username]
    const targetUser = users[target]
    const verb = command.split(/^!([a-z]+)lemon([a-z]*)$/)[1]
    const suffix = command.split(/^!([a-z]+)lemon([a-z]*)$/)[2]
    if (user.lemons === 0) { return talk(chatroom, `${user.displayName} has no lemons!`) }

    const singular = user.lemons === 1
    const coinFlip = Math.floor(Math.random() * 2)
    const allLemons = [`s`, `z`].includes(suffix)
    const plural = suffix.endsWith(`s`) || suffix.endsWith(`z`)

    if ([`give`, `bestow`, `offer`].includes(verb)) {
        if (allLemons) {
            if (targetUser) {
                targetUser.lemons += user.lemons
                user.lemons = 0
                talk(chatroom, `${user.displayName} gave all their lemons to ${targetUser.displayName}!`)
            } else {
                user.lemons = 0
                coinFlip
                    ? talk(chatroom, `${user.displayName} gave away all their lemons!`)
                    : talk(chatroom, `${user.displayName} lost all their lemons into the void!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                targetUser.lemons++
                coinFlip
                    ? talk(chatroom, `${user.displayName} gave a lemon to ${targetUser.displayName}!`)
                    : talk(chatroom, `${user.displayName} gave ${targetUser.displayName} a lemon!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} gave away a lemon!`)
                    : talk(chatroom, `${user.displayName} gave a lemon to nobody.`)
            }
        }
    } else if ([`eat`, `devour`, `munch`, `chomp`, `dineon`, `savor`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} ate all the lemons while ${targetUser.displayName} watched!`)
                    : talk(chatroom, `${user.displayName} fed all their lemons to ${targetUser.displayName}!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} ate all their lemons. Ack, sour!`)
                    : talk(chatroom, `${user.displayName} ate all their lemons. Eww, bitter!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} ate a whole lemon while ${targetUser.displayName} watched.`)
                    : talk(chatroom, `${user.displayName} fed a whole lemon to ${targetUser.displayName}.`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} ate a whole lemon. Ack, sour!`)
                    : talk(chatroom, `${user.displayName} ate a whole lemon. Eww, bitter!`)
            }
        }
    } else if ([`make`].includes(verb)) {
        if (allLemons) {
            if (targetUser) {
                if (coinFlip) {
                    user.lemons = 0
                    talk(chatroom, `${user.displayName} made all ${user.lemons} of their lemons into little ${targetUser.displayName}s. They marched away!`)
                } else {
                    talk(chatroom, `${targetUser.displayName} made all of ${user.displayName}'s lemons into... lemons. They gave them back!`)
                }
            } else {
                if (coinFlip) {
                    user.lemons = 0
                    talk(chatroom, `${user.displayName} "made" with their lemons. And now they're all used up?`)
                }
                else {
                    talk(chatroom, `${user.displayName} made their lemons into... more lemons. Nothing changed!`)
                }
            }
        } else if (!suffix) {
            if (targetUser) {
                if (coinFlip) {
                    user.lemons--
                    talk(chatroom, `${user.displayName} made a lemon into a little ${targetUser.displayName}. It said "goodbye"!`)
                } else {
                    talk(chatroom, `${targetUser.displayName} made a lemon out of ${user.displayName}'s lemon. They handed it back!`)
                }
            } else {
                if (coinFlip) {
                    user.lemons--
                    talk(chatroom, `${user.displayName} spent a lemon to "make". And now it's gone?`)
                }
                else {
                    talk(chatroom, `${user.displayName} made a lemon out of their lemon. It is the perpetual lemon cycle.`)
                }
            }
        }
    } else if ([`make`, `bake`, `cook`, `create`, `prepare`, `prep`, `brew`].includes(verb) && suffix) {
        user.lemons--
        const foodPatterns = /^(bar(s?)|cookie(s?)|tart(s?)|pie|hummus|soup|(pound|cup)?cake(s?)|trifle(s?)|muffin(s?)|roll(s?))$/
        const drinkPatterns = /^soda$|^punch$|^juice$|^hooch$|^booze$|^cider$|^water$|^tea$/
        const yummySounds = [
            `Yum`,
            `Yum`,
            `Mmm`,
            `Mmm`,
            `Tasty`,
            `Delicious`
        ]
        const yummySound = yummySounds[Math.floor(Math.random() * yummySounds.length)]
        if (foodPatterns.test(suffix)) {
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} made ${plural ? `` : `a `}lemon ${suffix}, and ${targetUser.displayName} watched them eat ${plural ? `them` : `it`}. ${yummySound}!`)
                    : talk(chatroom, `${user.displayName} made ${plural ? `` : `a `}lemon ${suffix}, and ${targetUser.displayName} ate ${plural ? `them` : `it`}. ${yummySound}!`)
            } else {
                talk(chatroom, `${user.displayName} made ${plural ? `` : `a `}lemon ${suffix}, and ate ${plural ? `them` : `it`}. ${yummySound}!`)
            }
        } else if (drinkPatterns.test(suffix)) {
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} made lemon ${suffix}, and ${targetUser.displayName} watched them drink it. ${yummySound}!`)
                    : talk(chatroom, `${user.displayName} made lemon ${suffix}, and ${targetUser.displayName} drank it. ${yummySound}!`)
            } else {
                talk(chatroom, `${user.displayName} made lemon ${suffix}, and drank it. ${yummySound}!`)
            }
        } else if (/^ade$/.test(suffix)) {
            if (targetUser) {
                talk(chatroom, `${user.displayName} made lemonade from lemons, and ${targetUser.displayName} drank it. Such is life.`)
            } else {
                talk(chatroom, `${user.displayName} made lemonade from lemons and drank it. Such is life.`)
            }
        } else if (/^meringuepie$/.test(suffix)) {
            if (targetUser) {
                talk(chatroom, `${user.displayName} blind baked a pie crust, beat some egg yolks, cooked them with sugar, lemon juice and zest, beat the egg whites to stiff peaks, filled the pie crust with the lemon curd, topped it with meringue, and browned it in the oven. ${targetUser.displayName.substring(0, 1).toUpperCase() + targetUser.displayName.substring(1)} ate it. ${yummySound}!`)
            } else {
                talk(chatroom, `${user.displayName} blind baked a pie crust, beat some egg yolks, cooked them with sugar, lemon juice and zest, beat the egg whites to stiff peaks, filled the pie crust with the lemon curd, topped it with meringue, and browned it in the oven. Then they ate it. ${yummySound}!`)
            }
        } else {
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} made ${plural ? `` : `a `}lemon ${suffix}, and ${targetUser.displayName} consumed ${plural ? `them` : `it`}. ${yummySound}!`)
                    : talk(chatroom, `${user.displayName} made ${plural ? `` : `a `}lemon ${suffix}, and ${targetUser.displayName} watched them consume ${plural ? `them` : `it`}. ${yummySound}!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} made ${plural ? `` : `a `}lemon ${suffix}, and consumed ${plural ? `them` : `it`}. ${yummySound}!`)
                    : talk(chatroom, `${user.displayName} made ${plural ? `` : `a `}lemon ${suffix}, but ${plural ? `them` : `it`} fell on the floor... ${yummySound}!`)
            }
        }
    } else if ([`throw`, `throwaway`, `yeet`, `toss`, `chunk`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} threw all their lemons at ${targetUser.displayName}! Ouch!`)
                    : talk(chatroom, `${user.displayName} pelted all their lemons at ${targetUser.displayName} as hard as they could!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} threw away their lemons!`)
                    : talk(chatroom, `${user.displayName} yeeted all their lemons away! Goodbye!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} threw a lemon at ${targetUser.displayName}'s head! Ouch!`)
                    : talk(chatroom, `${user.displayName} threw a lemon at the back of ${targetUser.displayName}'s head! Ouch!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} threw away a lemon!`)
                    : talk(chatroom, `${user.displayName} yeeted away a lemon! Goodbye!`)
            }
        }
    } else if ([`smash`, `crush`, `slam`, `destroy`, `explode`, `bust`, `burst`, `crunch`, `squish`, `smoosh`, `blowup`, `obliterate`, `pulverize`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} blew up all their lemons while ${targetUser.displayName} watched!`)
                    : talk(chatroom, `${targetUser.displayName} destroyed all of ${user.displayName}'s lemons!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} obilterated their lemons!`)
                    : talk(chatroom, `${user.displayName} blew up all their lemons!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} smashed a lemon into oblivion, and ${targetUser.displayName} watched.`)
                    : talk(chatroom, `${user.displayName} and ${targetUser.displayName} destroyed a lemon!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} smashed a lemon into oblivion!`)
                    : talk(chatroom, `${user.displayName} destroyed a lemon!`)
            }
        }
    } else if ([`slice`, `cut`, `chop`, `dice`, `fence`, `chiffonade`, `butcher`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} sliced up all their lemons, and showered ${targetUser.displayName} with them!`)
                    : talk(chatroom, `${targetUser.displayName} chopped up all ${user.displayName}'s lemons!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} sliced up all their lemons into wheels and threw them like frisbees!`)
                    : talk(chatroom, `${user.displayName} cut up all their lemons into tiny pieces!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} sliced a lemon into multiple pieces, but ${targetUser.displayName} knocked them on the floor!`)
                    : talk(chatroom, `${targetUser.displayName} chopped up ${user.displayName}'s lemon into tiny pieces!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} sliced a lemon into several pieces. They fell on the floor!`)
                    : talk(chatroom, `${user.displayName} cut up lemon into tiny pieces!`)
            }
        }
    } else if ([`juice`, `pulp`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} juiced all their lemons and ${targetUser.displayName} drank them. Eww, bitter!`)
                    : talk(chatroom, `${user.displayName} juiced all their lemons and ${targetUser.displayName} drank them. Mmm, refreshing!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} juiced all their lemons and drank them. Eww, bitter!`)
                    : talk(chatroom, `${user.displayName} juiced all their lemons and drank them. Mmm, refreshing!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} juiced a lemon and ${targetUser.displayName} drank it. Ack, sour!`)
                    : talk(chatroom, `${user.displayName} juiced a lemon and ${targetUser.displayName} drank it. Mmm, sweet!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} juiced a lemon and drank it. Ack, sour!`)
                    : talk(chatroom, `${user.displayName} juiced a lemon and drank it. Mmm, sweet!`)
            }
        }
    } else if ([`zest`, `grate`, `shave`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} zested all their lemons onto ${targetUser.displayName} until they were burined underneath. Nice!`)
                    : talk(chatroom, `${targetUser.displayName} grated up all ${user.displayName}'s lemons!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} zested all their lemons, and threw them away!`)
                    : talk(chatroom, `${user.displayName} grated up all their lemons!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} zested a lemon onto ${targetUser.displayName}'s head. Cute!`)
                    : talk(chatroom, `${targetUser.displayName} grated up ${user.displayName}'s lemon.`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} zested a lemon, and threw the rest away.`)
                    : talk(chatroom, `${user.displayName} grated up a lemon until it was all gone.`)
            }
        }
    } else if ([`peel`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                talk(chatroom, `${user.displayName} peeled all their lemons and gave them to ${targetUser.displayName}! They threw them away.`)
            } else {
                talk(chatroom, `${user.displayName} peeled all their lemons, and threw them away!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                talk(chatroom, `${user.displayName} peeled a lemon and gave it to ${targetUser.displayName}. They threw it away.`)
            } else {
                talk(chatroom, `${user.displayName} peeled a lemon, and threw the rest away.`)
            }
        }
    } else if ([`invest`].includes(verb)) {
        if (allLemons) {
            const randLemons = Math.floor(Math.random() * 3) + 1
            user.lemons = 0
            if (targetUser) {
                const sharedLemons = Math.ceil(randLemons / 2)
                if (coinFlip) {
                    user.lemons += sharedLemons
                    targetUser.lemons += sharedLemons
                    talk(chatroom, `${user.displayName} invested all their lemons into ${targetUser.displayName}'s growing business. They both got back ${sharedLemons} each!`)
                } else {
                    talk(chatroom, `${user.displayName} invested all their lemons into ${targetUser.displayName}'s growing business! They didn't get anything back.`)
                }
            } else {
                if (coinFlip) {
                    user.lemons += randLemons
                    talk(chatroom, `${user.displayName} put all their lemons into the stock market. They got ${randLemons} back!`)
                } else {
                    talk(chatroom, `${user.displayName} put all their lemons into the stock market! They didn't get anything back.`)
                }
            }
        } else {
            const randLemons = Math.ceil(Math.random() * 2)
            user.lemons--
            if (targetUser) {
                if (coinFlip) {
                    user.lemons++
                    targetUser.lemons++
                    talk(chatroom, `${user.displayName} invested a lemon into ${targetUser.displayName}'s growing business. They each got one lemon back in return!`)
                } else {
                    talk(chatroom, `${user.displayName} invested a lemon into ${targetUser.displayName}'s growing business! They didn't get anything back.`)
                }
            } else {
                if (coinFlip) {
                    user.lemons += randLemons
                    talk(chatroom, `${user.displayName} put a lemon into the stock market. They got ${randLemons} back!`)
                } else {
                    talk(chatroom, `${user.displayName} put a lemon into the stock market! They didn't get anything back.`)
                }
            }
        }
    } else if ([`carve`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                talk(chatroom, `${targetUser.displayName} carved all ${user.displayName}'s lemons into jack-o'-lemons! 🎃️`)
            } else {
                talk(chatroom, `${user.displayName} carved all their lemons into cute jack-o'-lemons! 🎃️`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                talk(chatroom, `${user.displayName} carved ${targetUser.displayName}'s face into a jack-o'-lemon! 🎃️`)
            } else {
                talk(chatroom, `${user.displayName} carved a lemon into a cute jack-o'-lemon! 🎃️`)
            }
        }
    } else if ([`smoke`, `puff`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                talk(chatroom, `${targetUser.displayName} smoked all of ${user.displayName}'s lemons!`)
            } else {
                talk(chatroom, `${user.displayName} loaded all their lemons into a bong and smoked them. Cool!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                talk(chatroom, `${user.displayName} smoked out of a lemon and passed it to ${targetUser.displayName}.`)
            } else {
                talk(chatroom, `${user.displayName} carved a lemon into a pipe and smoked out of it. Wow!`)
            }
        }
    } else if ([`kick`, `punt`, `roundhousekick`, `dropkick`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} kicked all their lemons at ${targetUser.displayName}!`)
                    : talk(chatroom, `${user.displayName} kicked their lemons one by one far over ${targetUser.displayName}'s head. Amazing!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} kicked all their lemons in one big explosion!`)
                    : talk(chatroom, `${user.displayName} set up and kicked all their lemons away one by one!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} kicked a lemon at ${targetUser.displayName}. Ouch!`)
                    : talk(chatroom, `${user.displayName} punted a lemon over ${targetUser.displayName}'s head. Wow!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} punted a lemon across the room!`)
                    : talk(chatroom, `${user.displayName} kicked a lemon out the window!`)
            }
        }
    } else if ([`bite`, `nibble`, `try`, `sample`, `taste`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} made ${targetUser.displayName} taste each of their lemons. They were all sour!`)
                    : talk(chatroom, `${user.displayName} made ${targetUser.displayName} taste each of their lemons. They were all sweet!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} took a small nibble from each of their lemons. They were all sour!`)
                    : talk(chatroom, `${user.displayName} took a small nibble from each of their lemons. They were all sweet!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} made ${targetUser.displayName} take a bite out of their lemon. Ack, sour!`)
                    : talk(chatroom, `${user.displayName} made ${targetUser.displayName} take a bite out of their lemon. Eww, bitter!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} took a bite out of a lemon. Ack, sour!`)
                    : talk(chatroom, `${user.displayName} took a bite out of a lemon. Eww, bitter!`)
            }
        }
    } else if ([`punch`, `hit`, `strike`, `karatechop`, `slap`, `beat`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} struck away all their lemons while ${targetUser.displayName} watched!`)
                    : talk(chatroom, `${targetUser.displayName} beat each of ${user.displayName}'s lemons into pulp!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} struck each of their lemons away while maniacally laughing!`)
                    : talk(chatroom, `${user.displayName} beat all their lemons into pulp!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} hit a lemon at ${targetUser.displayName}, and it rolled onto the floor.`)
                    : talk(chatroom, `${targetUser.displayName} hit ${user.displayName}'s lemon, and it rolled onto the floor.`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} hit a lemon. It rolled away.`)
                    : talk(chatroom, `${user.displayName} struck a lemon, and it ran away in tears.`)
            }
        }
    } else if ([`keep`, `guard`, `protect`, `bogart`, `dontuse`, `notuse`, `donotuse`].includes(verb)) {
        if (allLemons) {
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} is holding onto all their lemons and making ${targetUser.displayName} jealous!`)
                    : talk(chatroom, `${user.displayName} is making sure ${targetUser.displayName} doesn't get their lemons!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} is guarding all their lemons with their life!`)
                    : talk(chatroom, `${user.displayName} is safeguarding all their lemons for future investment!`)
            }
        } else {
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} is holding on to their lemon and making ${targetUser.displayName} jealous.`)
                    : talk(chatroom, `${user.displayName} is making sure ${targetUser.displayName} doesn't get their lemon.`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} decided to keep their lemon. They'll cherish it forever.`)
                    : talk(chatroom, `${user.displayName} is keeping their lemon safe and sound.`)
            }
        }
    } else if ([`show`, `flash`, `wave`, `flaunt`, `expose`, `exhibit`, `display`, `showcase`, `showoff`].includes(verb)) {
        if (allLemons) {
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} flaunts their ${singular ? `` : `${user.lemons} `}lemon${singular ? `` : `s`} at ${targetUser.displayName}!`)
                    : talk(chatroom, `${user.displayName} shows off their ${singular ? `` : `${user.lemons} `}lemon${singular ? `` : `s`} to ${targetUser.displayName}!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} flaunts their ${singular ? `` : `${user.lemons} `}lemon${singular ? `` : `s`} at everyone!`)
                    : talk(chatroom, `${user.displayName} puts their ${singular ? `` : `${user.lemons} `}lemon${singular ? `` : `s`} on display for all to see!`)
            }
        } else {
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} waves a lemon at ${targetUser.displayName}!`)
                    : talk(chatroom, `${user.displayName} shows ${targetUser.displayName} a lemon.`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} shows everyone their lemon!`)
                    : talk(chatroom, `${user.displayName} waves a lemon wildly in the air!`)
            }
        }
    } else if ([`forget`, `neglect`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} asked ${targetUser.displayName} to watch their lemons, but they neglected them. They all disappeared!`)
                    : talk(chatroom, `${user.displayName} asked ${targetUser.displayName} to watch their lemons, but they misplaced them!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} neglected their lemons, and they vanished into thin air!`)
                    : talk(chatroom, `${user.displayName} neglected their lemons, and they disappeared!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} asked ${targetUser.displayName} to watch their lemon, and they forgot to. It disappeared.`)
                    : talk(chatroom, `${user.displayName} asked ${targetUser.displayName} to watch their lemon, but they misplaced it.`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} forgot about their lemon. It vanished into thin air.`)
                    : talk(chatroom, `${user.displayName} forgot their lemon. It disappeared.`)
            }
        }
    } else if ([`drop`, `fumble`, `letgoof`, `release`, `spill`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} dropped their lemons on ${targetUser.displayName}'s feet, and they rolled away!`)
                    : talk(chatroom, `${user.displayName}'s lemons spilled out of ${targetUser.displayName}'s arms!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} dropped all their lemons onto the floor, and they rolled away!`)
                    : talk(chatroom, `${user.displayName} spilled all the lemons out of their wallet!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} dropped a lemon on ${targetUser.displayName}'s foot, and it rolled away.`)
                    : talk(chatroom, `${targetUser.displayName} fumbled ${user.displayName}'s lemon, and it rolled away.`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} dropped a lemon on the floor, and it rolled away.`)
                    : talk(chatroom, `${user.displayName} released a lemon into the wild. Bye lemon!`)
            }
        }
    } else if ([`burn`, `combust`, `ignite`, `light`, `torch`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} set fire to their lemon collection and watched along with ${targetUser.displayName}!`)
                    : talk(chatroom, `${targetUser.displayName} helped ${user.displayName} burn up all their lemons!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} set up all their lemons and started a bonfire!`)
                    : talk(chatroom, `${user.displayName} burned all their lemons in a massive inferno!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} set fire to a lemon and watched it burn with ${targetUser.displayName}.`)
                    : talk(chatroom, `${targetUser.displayName} burned ${user.displayName}'s lemon into ashes.`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} set fire to a lemon and watched it burn to the ground.`)
                    : talk(chatroom, `${user.displayName} lit a lemon on fire, and it burned to a crisp.`)
            }
        }
    } else if ([`kill`, `murder`, `slaughter`, `assassinate`, `terminate`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} killed each of their lemons, and ${targetUser.displayName} looked on nervously.`)
                    : talk(chatroom, `${targetUser.displayName} murdered all of ${user.displayName}'s lemons!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} slaughtered all their lemons!`)
                    : talk(chatroom, `${user.displayName} assassinated all their lemons!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} killed a lemon, and ${targetUser.displayName} decided not to call the police.`)
                    : talk(chatroom, `${targetUser.displayName} murdered ${user.displayName}'s lemon!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} killed a lemon, and it died.`)
                    : talk(chatroom, `${user.displayName} murdered a lemon!`)
            }
        }
    } else if ([`donate`, `gift`].includes(verb)) {
        if (allLemons) {
            if (targetUser) {
                targetUser.lemons += user.lemons
                user.lemons = 0
                coinFlip
                    ? talk(chatroom, `${user.displayName} donated all their lemons to ${targetUser.displayName}!`)
                    : talk(chatroom, `${user.displayName} gifted all their lemons to ${targetUser.displayName}!`)
            } else {
                user.lemons = 0
                coinFlip
                    ? talk(chatroom, `${user.displayName} donated all their lemons to a good cause!`)
                    : talk(chatroom, `${user.displayName} gifted all their lemons to a hungry family!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                targetUser.lemons++
                coinFlip
                    ? talk(chatroom, `${user.displayName} donated a lemon to ${targetUser.displayName} in their time of need.`)
                    : talk(chatroom, `${user.displayName} gifted a lemon to ${targetUser.displayName}!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} donated a lemon to a charitable cause.`)
                    : talk(chatroom, `${user.displayName} gifted a lemon to someone in their time of need.`)
            }
        }
    } else if ([`teach`, `raise`, `mentor`, `guide`, `advise`, `educate`, `parent`, `takein`, `bringup`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} and ${targetUser.displayName} raised a family of lemons! They left the nest and lived fulfilling lives.`)
                    : talk(chatroom, `${user.displayName} and ${targetUser.displayName} brought up a strong family of lemons! They went on to become productive members of society.`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} educated a lemon about the ways of life. It went off to study at a prestigious university.`)
                    : talk(chatroom, `${user.displayName} gave life advice to their lemon. It grew to become a strong, independent lemon.`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} and ${targetUser.displayName} raised a lemon. It left the nest and lived a fulfilling life.`)
                    : talk(chatroom, `${user.displayName} and ${targetUser.displayName} taught a lemon about the ways of life. It went on to become president.`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} educated a lemon about the ways of life. It went off to study at a prestigious university.`)
                    : talk(chatroom, `${user.displayName} gave life advice to their lemon. It grew to become a strong, independent lemon.`)
            }
        }
    } else if ([`plant`, `bury`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} enlisted ${targetUser.displayName}'s help to plant all their lemons into lemon trees!`)
                    : talk(chatroom, `${targetUser.displayName} buried all of ${user.displayName}'s lemons underground, fertilizing the soil!`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} planted a lemon in the ground, in hopes that it would grow into a tree.`)
                    : talk(chatroom, `${user.displayName} buried a lemon into the earth.`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} and ${targetUser.displayName} planted a lemon in the ground, in hopes that it would grow into a tree.`)
                    : talk(chatroom, `${targetUser.displayName} buried ${user.displayName}'s lemon underground. Nothing happened.`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} planted a lemon in the ground, in hopes that it would grow into a tree.`)
                    : talk(chatroom, `${user.displayName} buried a lemon into the earth.`)
            }
        }
    } else if ([`scold`, `bully`, `makefunof`, `mock`, `gangupon`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} mocked all their lemons until they evaporated, despite ${targetUser.displayName} pleading them to stop!`)
                    : talk(chatroom, `${targetUser.displayName} bullied all of ${user.displayName}'s lemons! They rolled away in shame.`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} bullied a lemon. It rolled away in tears.`)
                    : talk(chatroom, `${user.displayName} mocked a lemon. It shrank until it disappeared.`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                coinFlip
                    ? talk(chatroom, `${user.displayName} and ${targetUser.displayName} ganged up on a lemon. It rolled away in shame.`)
                    : talk(chatroom, `${targetUser.displayName} made fun of ${user.displayName}'s lemon. It shrank until it disappeared.`)
            } else {
                coinFlip
                    ? talk(chatroom, `${user.displayName} bullied a lemon. It rolled away in tears.`)
                    : talk(chatroom, `${user.displayName} mocked a lemon. It shrank until it disappeared.`)
            }
        }
    } else if ([`smell`, `sniff`, `whiff`, `nebulize`].includes(verb)) {
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                talk(chatroom, `${user.displayName} made a nice fragrance out of all their lemons for ${targetUser.displayName} to smell!`)
            } else {
                talk(chatroom, `All of ${user.displayName}'s lemons melted into a puddle, which smelled very citrusy!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                talk(chatroom, `${user.displayName} and ${targetUser.displayName} smelled a lemon. It nebulized into the air like a fine perfume.`)
            } else {
                talk(chatroom, `${user.displayName} smelled a lemon. It nebulized into the air like a fine perfume.`)
            }
        }
    } else if ([`gamble`, `roulette`, `bet`].includes(verb)) {
        if (allLemons) {
            if (coinFlip) {
                user.lemons *= 2
                talk(chatroom, `${user.displayName} gambled all their lemons, and doubled them!`)
            } else {
                user.lemons = 0
                talk(chatroom, `${user.displayName} gambled all their lemons, and lost them all!`)
            }
        } else {
            user.lemons--
            if (coinFlip) {
                user.lemons += 2
                talk(chatroom, `${user.displayName} gambled a lemon, and got two back!`)
            } else {
                talk(chatroom, `${user.displayName} gambled a lemon, and lost it!`)
            }
        }
    } else {
        const nullOutcomes = [
            `exploded`,
            `blew away`,
            `disappeared`,
            `vanished into thin air`,
            `evaporated`,
            `rolled away`,
            `melted`,
            `declined the offer`
        ]
        const nullOutcome = nullOutcomes[Math.floor(Math.random() * nullOutcomes.length)]
        if (allLemons) {
            user.lemons = 0
            if (targetUser) {
                talk(chatroom, `${user.displayName} tried to ${verb} their lemons with ${targetUser.displayName}, but they all ${nullOutcome}. Whoops!`)
            } else {
                talk(chatroom, `${user.displayName} tried to ${verb} their lemons, but they all ${nullOutcome}. Whoops!`)
            }
        } else {
            user.lemons--
            if (targetUser) {
                talk(chatroom, `${user.displayName} tried to ${verb} a lemon with ${targetUser.displayName}, but it ${nullOutcome}. Whoops!`)
            } else {
                talk(chatroom, `${user.displayName} tried to ${verb} a lemon, but it ${nullOutcome}. Whoops!`)
            }
        }
    }
}

module.exports = { useLemon }
