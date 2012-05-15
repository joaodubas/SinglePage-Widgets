# Widgets for singlepage website

On a project, the client needed a singlepage website with three requirements:

1. Fixed menu that would scroll the window to the desired section content,
2. Activate the menu item accordingly with the viewed section content,
3. Allow the user to bookmark each section content.

Probably there are tons of plugins that would allow me to achieve the first two
objectives, but I simply couldn't find anything that could do all steps.

Besides that, I really enjoy the idea of create something that should be used
with a fixed markup structure, instead of a plugin with a lot of configurations.

## Page structure

The first step to use the widgets is to create the page markup, following the
example bellow:

```
<!DOCTYPE html>
<html>
<head>. . .</head>

<body>
    <header>
        <nav>
            <ul>
                <li><a href="#!/teste1">Teste1</a></li>
                <li><a href="#!/teste2">Teste2</a></li>
            </ul>
        </nav>
    </header>
    <div role="main">
        <section id="teste0" class="box">
            <h2 class="section-title">Teste0</h2>
        </section>
        <section id="teste1" class="box">
            <h2 class="section-title">Teste1</h2>
        </section>
        <section id="teste2" class="box">
            <h2 class="section-title">Teste2</h2>
        </section>
    </div>
</body>
</html>
```

## Using the widgets
