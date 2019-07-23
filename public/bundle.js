
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.data !== data)
            text.data = data;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, value) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src/Hero.svelte generated by Svelte v3.6.7 */

    const file = "src/Hero.svelte";

    function create_fragment(ctx) {
    	var div, t0, t1;

    	return {
    		c: function create() {
    			div = element("div");
    			t0 = text("Hero ");
    			t1 = text(ctx.catName);
    			attr(div, "class", "hero");
    			add_location(div, file, 4, 0, 42);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			append(div, t0);
    			append(div, t1);
    		},

    		p: function update(changed, ctx) {
    			if (changed.catName) {
    				set_data(t1, ctx.catName);
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div);
    			}
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let { catName } = $$props;

    	const writable_props = ['catName'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Hero> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('catName' in $$props) $$invalidate('catName', catName = $$props.catName);
    	};

    	return { catName };
    }

    class Hero extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, ["catName"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.catName === undefined && !('catName' in props)) {
    			console.warn("<Hero> was created without expected prop 'catName'");
    		}
    	}

    	get catName() {
    		throw new Error("<Hero>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set catName(value) {
    		throw new Error("<Hero>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Header.svelte generated by Svelte v3.6.7 */

    const file$1 = "src/Header.svelte";

    function create_fragment$1(ctx) {
    	var div, t0, t1;

    	return {
    		c: function create() {
    			div = element("div");
    			t0 = text("Header ");
    			t1 = text(ctx.catName);
    			attr(div, "class", "header");
    			add_location(div, file$1, 4, 0, 42);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			append(div, t0);
    			append(div, t1);
    		},

    		p: function update(changed, ctx) {
    			if (changed.catName) {
    				set_data(t1, ctx.catName);
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div);
    			}
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { catName } = $$props;

    	const writable_props = ['catName'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('catName' in $$props) $$invalidate('catName', catName = $$props.catName);
    	};

    	return { catName };
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, ["catName"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.catName === undefined && !('catName' in props)) {
    			console.warn("<Header> was created without expected prop 'catName'");
    		}
    	}

    	get catName() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set catName(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.6.7 */

    const file$2 = "src/App.svelte";

    function create_fragment$2(ctx) {
    	var div, article, t0, t1, h1, t2, t3, t4, current;

    	var hero = new Hero({
    		props: { catName: ctx.dummyData[0] },
    		$$inline: true
    	});

    	var header = new Header({
    		props: { catName: ctx.dummyData[1] },
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			div = element("div");
    			article = element("article");
    			hero.$$.fragment.c();
    			t0 = space();
    			header.$$.fragment.c();
    			t1 = space();
    			h1 = element("h1");
    			t2 = text("Test4 ");
    			t3 = text(ctx.name);
    			t4 = text("!");
    			attr(h1, "class", "svelte-1ls32w3");
    			add_location(h1, file$2, 25, 2, 429);
    			attr(article, "class", "page");
    			add_location(article, file$2, 21, 1, 333);
    			attr(div, "class", "wrapper svelte-1ls32w3");
    			add_location(div, file$2, 20, 0, 310);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			append(div, article);
    			mount_component(hero, article, null);
    			append(article, t0);
    			mount_component(header, article, null);
    			append(article, t1);
    			append(article, h1);
    			append(h1, t2);
    			append(h1, t3);
    			append(h1, t4);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var hero_changes = {};
    			if (changed.dummyData) hero_changes.catName = ctx.dummyData[0];
    			hero.$set(hero_changes);

    			var header_changes = {};
    			if (changed.dummyData) header_changes.catName = ctx.dummyData[1];
    			header.$set(header_changes);

    			if (!current || changed.name) {
    				set_data(t3, ctx.name);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(hero.$$.fragment, local);

    			transition_in(header.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(hero.$$.fragment, local);
    			transition_out(header.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div);
    			}

    			destroy_component(hero, );

    			destroy_component(header, );
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	

    	// data
    	const dummyData = ['Mittens', 'Murle'];

    	let { name } = $$props;

    	const writable_props = ['name'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    	};

    	return { dummyData, name };
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, ["name"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.name === undefined && !('name' in props)) {
    			console.warn("<App> was created without expected prop 'name'");
    		}
    	}

    	get name() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world23'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
