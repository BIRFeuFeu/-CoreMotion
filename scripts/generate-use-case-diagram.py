"""Generate the editable CoreMotiom UML diagram and print-ready SVG/PNG.

The .drawio and .svg use only the standard library. A matching high-resolution
PNG is also generated if Pillow is installed (pip install pillow). The same
coordinates and labels feed every export.
Run from the repository root: python scripts/generate-use-case-diagram.py
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from xml.etree import ElementTree as ET

OUT = Path(__file__).resolve().parents[1] / "docs"
NAME = "diagrama-casos-de-uso-coremotiom"
WIDTH, HEIGHT = 2500, 1250
BOUNDARY = (240, 310, 2040, 810)
COL_X = {"NAV": 310, "VIS": 715, "ATL": 1120, "LOJ": 1525, "ADM": 1930}
OVAL_W, OVAL_H = 335, 100


@dataclass(frozen=True)
class Actor:
    id: str
    label: str
    heading: str
    color: str
    fill: str

    @property
    def center_x(self) -> float:
        return COL_X[self.id] + OVAL_W / 2


ACTORS = [
    Actor("NAV", "Pessoa que navega", "CONSULTA E COMPRA", "#245AA5", "#EDF5FF"),
    Actor("VIS", "Visitante", "ACESSO", "#475569", "#F1F5F9"),
    Actor("ATL", "Atleta cadastrado", "ATLETA E COMUNIDADE", "#6D44B5", "#F3EFFF"),
    Actor("LOJ", "Lojista", "LOJAS", "#187449", "#ECF8F0"),
    Actor("ADM", "Administrador", "ADMINISTRAÇÃO", "#A34E30", "#FFF2E9"),
]
ACTOR_BY_ID = {a.id: a for a in ACTORS}


@dataclass(frozen=True)
class Case:
    id: str
    actor_id: str
    lines: tuple[str, ...]
    y: int

    @property
    def x(self) -> int:
        return COL_X[self.actor_id]

    @property
    def center_y(self) -> float:
        return self.y + OVAL_H / 2


CASES = [
    Case("UC01", "NAV", ("Consultar e filtrar", "produtos"), 445),
    Case("UC02", "NAV", ("Consultar lojas",), 555),
    Case("UC03", "NAV", ("Ler publicações da", "comunidade"), 665),
    Case("UC04", "NAV", ("Consultar", "treinadores"), 775),
    Case("UC05", "NAV", ("Gerenciar carrinho",), 885),
    Case("UC06", "NAV", ("Finalizar pedido", "(simulação)"), 995),
    Case("UC07", "VIS", ("Cadastrar conta",), 555),
    Case("UC08", "VIS", ("Entrar na conta",), 775),
    Case("UC09", "ATL", ("Anunciar produto", "C2C"), 500),
    Case("UC10", "ATL", ("Interagir na", "comunidade"), 700),
    Case("UC11", "LOJ", ("Cadastrar loja",), 555),
    Case("UC12", "LOJ", ("Solicitar verificação", "da loja"), 775),
    Case("UC13", "ADM", ("Analisar verificação", "da loja"), 445),
    Case("UC14", "ADM", ("Gerenciar usuários",), 625),
    Case("UC15", "ADM", ("Moderar produtos",), 805),
    Case("UC16", "ADM", ("Atualizar situação", "de pedidos"), 985),
    Case("UC17", "ATL", ("Salvar produto", "como favorito"), 900),
]
GENERIC_CHILDREN = ("VIS", "ATL", "LOJ", "ADM")
GEN_LANES = (121, 88, 55, 22)
GEN_TARGET_OFFSETS = (-39, -13, 13, 39)


def fmt(number: float) -> str:
    return f"{number:g}"


def elem(parent: ET.Element, tag: str, **attrs: object) -> ET.Element:
    return ET.SubElement(parent, tag, {k.replace("_", "-"): str(v) for k, v in attrs.items()})


def vertex(root: ET.Element, node_id: str, value: str, style: str, x: float, y: float,
           w: float, h: float, parent: str = "1") -> ET.Element:
    cell = ET.SubElement(root, "mxCell", {
        "id": node_id, "value": value, "style": style, "vertex": "1", "parent": parent,
    })
    ET.SubElement(cell, "mxGeometry", {
        "x": fmt(x), "y": fmt(y), "width": fmt(w), "height": fmt(h), "as": "geometry",
    })
    return cell


def edge(root: ET.Element, edge_id: str, source: str, target: str, style: str,
         points: list[tuple[float, float]]) -> None:
    cell = ET.SubElement(root, "mxCell", {
        "id": edge_id, "style": style, "edge": "1", "parent": "1",
        "source": source, "target": target,
    })
    geometry = ET.SubElement(cell, "mxGeometry", {"relative": "1", "as": "geometry"})
    waypoints = ET.SubElement(geometry, "Array", {"as": "points"})
    for x, y in points:
        ET.SubElement(waypoints, "mxPoint", {"x": fmt(x), "y": fmt(y)})


def association_points(case: Case, lane_index: int) -> list[tuple[float, float]]:
    # Each line has a separate lane in the gutter to the left of its column.
    if case.actor_id == "NAV":
        lane_x = case.x - 15 - 9 * lane_index
    else:
        lane_x = case.x - 33 - 9 * lane_index
    return [(lane_x, 211), (lane_x, case.center_y)]


def make_drawio() -> None:
    mxfile = ET.Element("mxfile", {
        "host": "app.diagrams.net", "modified": "2026-09-29T00:00:00.000Z",
        "agent": "CoreMotiom academic use-case model", "version": "24.7.17", "type": "device",
    })
    diagram = ET.SubElement(mxfile, "diagram", {
        "id": "coremotiom-use-cases", "name": "Casos de uso - CoreMotiom",
    })
    graph = ET.SubElement(diagram, "mxGraphModel", {
        "dx": "1600", "dy": "850", "grid": "1", "gridSize": "10", "guides": "1",
        "tooltips": "1", "connect": "1", "arrows": "1", "fold": "1",
        "page": "1", "pageScale": "1", "pageWidth": str(WIDTH), "pageHeight": str(HEIGHT),
        "math": "0", "shadow": "0",
    })
    root = ET.SubElement(graph, "root")
    ET.SubElement(root, "mxCell", {"id": "0"})
    ET.SubElement(root, "mxCell", {"id": "1", "parent": "0"})
    bx, by, bw, bh = BOUNDARY
    vertex(root, "system", "", "rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;"
           "strokeColor=#334155;strokeWidth=3;connectable=0;", bx, by, bw, bh)
    # Keep the boundary label inside the first column, clear of the vertical
    # association lanes in the gutters between columns.
    vertex(root, "system_title", "CoreMotiom",
           "text;html=1;align=left;verticalAlign=middle;fontSize=36;fontStyle=1;"
           "fontColor=#0F172A;strokeColor=none;fillColor=none;", bx + 80, by + 4, 320, 43)
    vertex(root, "system_subtitle", "plataforma esportiva",
           "text;html=1;align=left;verticalAlign=middle;fontSize=22;"
           "fontColor=#475569;strokeColor=none;fillColor=none;", bx + 80, by + 42, 350, 28)

    for actor in ACTORS:
        x = actor.center_x
        vertex(root, f"group_{actor.id}", "", "group;html=1;container=1;collapsible=0;",
               x - 125, 165, 250, 123)
        vertex(root, f"actor_{actor.id}", "", "shape=umlActor;html=1;whiteSpace=wrap;"
               "strokeColor=#243047;fillColor=#FFFFFF;strokeWidth=3;",
               75, 0, 100, 85, parent=f"group_{actor.id}")
        vertex(root, f"label_{actor.id}", actor.label,
               "text;html=1;align=center;verticalAlign=middle;fontSize=26;fontStyle=1;"
               "fontColor=#0F172A;strokeColor=none;fillColor=none;",
               0, 89, 250, 35, parent=f"group_{actor.id}")
        vertex(root, f"heading_{actor.id}", actor.heading,
               "text;html=1;align=center;verticalAlign=middle;fontSize=24;fontStyle=1;"
               f"fontColor={actor.color};strokeColor=none;fillColor=none;",
               COL_X[actor.id], by + 78, OVAL_W, 32)

    for case in CASES:
        actor = ACTOR_BY_ID[case.actor_id]
        label = f"<b>{case.id}</b><br/>" + "<br/>".join(case.lines)
        vertex(root, case.id, label, "ellipse;whiteSpace=wrap;html=1;align=center;"
               "verticalAlign=middle;spacing=2;fontSize=25;fontColor=#0F172A;"
               f"fillColor={actor.fill};strokeColor={actor.color};strokeWidth=2.5;",
               case.x, case.y, OVAL_W, OVAL_H)

    assoc_style = ("html=1;rounded=0;strokeColor=#66758A;strokeWidth=2.5;"
                   "startArrow=none;endArrow=none;exitX=0.24;exitY=0.54;"
                   "exitPerimeter=0;entryX=0;entryY=0.5;entryPerimeter=1;")
    for actor in ACTORS:
        owned = [case for case in CASES if case.actor_id == actor.id]
        for index, case in enumerate(owned):
            edge(root, f"association_{case.id}", f"actor_{actor.id}", case.id,
                 assoc_style, association_points(case, index))

    gen_style_prefix = ("html=1;rounded=0;strokeColor=#334155;strokeWidth=2.7;"
                        "startArrow=none;endArrow=block;endFill=0;endSize=20;"
                        "exitX=0.5;exitY=0;exitPerimeter=0;entryY=0;entryPerimeter=0;")
    for child_id, lane, offset in zip(GENERIC_CHILDREN, GEN_LANES, GEN_TARGET_OFFSETS):
        child_x = ACTOR_BY_ID[child_id].center_x
        generic_x = ACTOR_BY_ID["NAV"].center_x + offset
        target_fraction = (50 + offset) / 100
        edge(root, f"generalization_{child_id}", f"actor_{child_id}", "actor_NAV",
             gen_style_prefix + f"entryX={target_fraction:g};",
             [(child_x, lane), (generic_x, lane)])

    vertex(root, "note", "Nota: UC06 e atualização de pedidos são fluxos demonstrativos/sandbox; "
           "consultar treinadores não implica contratação efetiva.",
           "text;html=1;align=center;verticalAlign=middle;fontSize=24;"
           "fontColor=#475569;strokeColor=none;fillColor=none;", 280, 1132, 1940, 50)

    ET.indent(mxfile, space="  ")
    path = OUT / f"{NAME}.drawio"
    ET.ElementTree(mxfile).write(path, encoding="utf-8", xml_declaration=True)
    print(f"Saved {path}")


def svg_path(root: ET.Element, points: list[tuple[float, float]], *, stroke: str,
             width: float, marker: str | None = None) -> None:
    path = "M " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in points)
    attrs = {"d": path, "fill": "none", "stroke": stroke,
             "stroke-width": fmt(width), "stroke-linejoin": "round", "stroke-linecap": "round"}
    if marker:
        attrs["marker-end"] = marker
    ET.SubElement(root, "path", attrs)


def svg_text(root: ET.Element, text: str, x: float, y: float, *, size: int,
             fill: str = "#0F172A", weight: str = "normal", anchor: str = "middle") -> None:
    tag = ET.SubElement(root, "text", {
        "x": fmt(x), "y": fmt(y), "font-family": "Arial, DejaVu Sans, sans-serif",
        "font-size": str(size), "font-weight": weight, "fill": fill,
        "text-anchor": anchor,
    })
    tag.text = text


def make_svg() -> None:
    ns = "http://www.w3.org/2000/svg"
    ET.register_namespace("", ns)
    svg = ET.Element(f"{{{ns}}}svg", {
        "width": str(WIDTH), "height": str(HEIGHT),
        "viewBox": f"0 0 {WIDTH} {HEIGHT}", "role": "img",
        "aria-label": "Diagrama de casos de uso UML do CoreMotiom",
    })
    defs = ET.SubElement(svg, "defs")
    marker = ET.SubElement(defs, "marker", {
        "id": "hollow-triangle", "markerWidth": "25", "markerHeight": "22",
        "refX": "22", "refY": "11", "orient": "auto",
        "markerUnits": "userSpaceOnUse", "viewBox": "0 0 25 22",
    })
    ET.SubElement(marker, "path", {
        "d": "M 1 1 L 22 11 L 1 21 Z", "fill": "#FFFFFF",
        "stroke": "#334155", "stroke-width": "2.2",
    })
    ET.SubElement(svg, "rect", {"x": "0", "y": "0", "width": str(WIDTH),
                                "height": str(HEIGHT), "fill": "#FFFFFF"})
    bx, by, bw, bh = BOUNDARY
    ET.SubElement(svg, "rect", {"x": str(bx), "y": str(by),
                                "width": str(bw), "height": str(bh),
                                "fill": "#FFFFFF", "stroke": "#334155", "stroke-width": "3"})
    svg_text(svg, "CoreMotiom", bx + 80, by + 35,
             size=36, weight="bold", anchor="start")
    svg_text(svg, "plataforma esportiva", bx + 80, by + 61,
             size=22, fill="#475569", anchor="start")

    for actor in ACTORS:
        svg_text(svg, actor.heading, actor.center_x, by + 104, size=24,
                 fill=actor.color, weight="bold")

    # Connections go behind the actor glyphs and use-case ovals.
    for actor in ACTORS:
        owned = [case for case in CASES if case.actor_id == actor.id]
        for index, case in enumerate(owned):
            lane_x, src_y = association_points(case, index)[0]
            svg_path(svg, [(actor.center_x - 26, src_y), (lane_x, src_y),
                           (lane_x, case.center_y), (case.x, case.center_y)],
                     stroke="#66758A", width=2.5)
    for child_id, lane, offset in zip(GENERIC_CHILDREN, GEN_LANES, GEN_TARGET_OFFSETS):
        child_x = ACTOR_BY_ID[child_id].center_x
        generic_x = ACTOR_BY_ID["NAV"].center_x + offset
        svg_path(svg, [(child_x, 165), (child_x, lane), (generic_x, lane), (generic_x, 165)],
                 stroke="#334155", width=2.7, marker="url(#hollow-triangle)")

    for case in CASES:
        actor = ACTOR_BY_ID[case.actor_id]
        ET.SubElement(svg, "ellipse", {
            "cx": fmt(case.x + OVAL_W / 2), "cy": fmt(case.center_y),
            "rx": fmt(OVAL_W / 2), "ry": fmt(OVAL_H / 2),
            "fill": actor.fill, "stroke": actor.color, "stroke-width": "2.5",
        })
        center = case.x + OVAL_W / 2
        if len(case.lines) == 1:
            svg_text(svg, case.id, center, case.y + 38, size=25, weight="bold")
            svg_text(svg, case.lines[0], center, case.y + 71, size=27)
        else:
            svg_text(svg, case.id, center, case.y + 23, size=24, weight="bold")
            svg_text(svg, case.lines[0], center, case.y + 54, size=27)
            svg_text(svg, case.lines[1], center, case.y + 83, size=26)

    for actor in ACTORS:
        x = actor.center_x
        # UML stick figure: head, torso, arms and legs.
        ET.SubElement(svg, "circle", {"cx": fmt(x), "cy": "182", "r": "12",
                                       "fill": "white", "stroke": "#243047", "stroke-width": "3.4"})
        for points in (
            [(x, 194), (x, 225)], [(x - 26, 207), (x + 26, 207)],
            [(x, 225), (x - 23, 247)], [(x, 225), (x + 23, 247)],
        ):
            svg_path(svg, points, stroke="#243047", width=3.5)
        svg_text(svg, actor.label, x, 283, size=26, weight="bold")

    svg_text(svg,
             "Nota: UC06 e atualização de pedidos são demonstrativos/sandbox; "
             "consulta de treinadores não implica contratação efetiva.",
             WIDTH / 2, 1166, size=24, fill="#475569")

    ET.indent(svg, space="  ")
    path = OUT / f"{NAME}.svg"
    ET.ElementTree(svg).write(path, encoding="utf-8", xml_declaration=True)
    print(f"Saved {path}")


def make_png() -> None:
    """Rasterize the shared geometry at 4,000 px without relying on a browser."""
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        print("Optional PNG skipped: install Pillow with 'pip install pillow'.")
        return

    scale = 1.6
    px = lambda value: round(value * scale)
    image = Image.new("RGB", (px(WIDTH), px(HEIGHT)), "#FFFFFF")
    draw = ImageDraw.Draw(image)
    regular = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    bold = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    fonts: dict[tuple[int, bool], ImageFont.FreeTypeFont] = {}

    def text(label: str, x: float, y: float, size: int, color: str = "#0F172A",
             is_bold: bool = False, anchor: str = "mm") -> None:
        key = (size, is_bold)
        if key not in fonts:
            fonts[key] = ImageFont.truetype(bold if is_bold else regular, px(size))
        draw.text((px(x), px(y)), label, fill=color, font=fonts[key], anchor=anchor)

    def line(points: list[tuple[float, float]], color: str, width: float) -> None:
        draw.line([(px(x), px(y)) for x, y in points], fill=color,
                  width=max(1, px(width)), joint="curve")

    bx, by, bw, bh = BOUNDARY
    draw.rectangle((px(bx), px(by), px(bx + bw), px(by + bh)),
                   outline="#334155", width=px(3))
    text("CoreMotiom", bx + 80, by + 26,
         36, is_bold=True, anchor="lm")
    text("plataforma esportiva", bx + 80, by + 54,
         22, "#475569", anchor="lm")
    for actor in ACTORS:
        text(actor.heading, actor.center_x, by + 93, 24, actor.color, True)

    # All connection paths go behind the ovals and actor symbols.
    for actor in ACTORS:
        owned = [case for case in CASES if case.actor_id == actor.id]
        for index, case in enumerate(owned):
            bus_x, src_y = association_points(case, index)[0]
            line([(actor.center_x - 26, src_y), (bus_x, src_y),
                  (bus_x, case.center_y), (case.x, case.center_y)], "#66758A", 2.5)
    for child_id, lane, offset in zip(GENERIC_CHILDREN, GEN_LANES, GEN_TARGET_OFFSETS):
        child_x = ACTOR_BY_ID[child_id].center_x
        target_x = ACTOR_BY_ID["NAV"].center_x + offset
        line([(child_x, 165), (child_x, lane), (target_x, lane), (target_x, 165)],
             "#334155", 2.7)
        # Hollow UML generalization triangle: apex touches the generic actor.
        draw.polygon([(px(target_x), px(165)), (px(target_x - 11), px(144)),
                      (px(target_x + 11), px(144))], fill="#FFFFFF")
        draw.line([(px(target_x), px(165)), (px(target_x - 11), px(144)),
                   (px(target_x + 11), px(144)), (px(target_x), px(165))],
                  fill="#334155", width=px(2.5), joint="curve")

    for case in CASES:
        actor = ACTOR_BY_ID[case.actor_id]
        draw.ellipse((px(case.x), px(case.y), px(case.x + OVAL_W),
                      px(case.y + OVAL_H)), fill=actor.fill,
                     outline=actor.color, width=px(2.5))
        center = case.x + OVAL_W / 2
        if len(case.lines) == 1:
            text(case.id, center, case.y + 29, 25, is_bold=True)
            text(case.lines[0], center, case.y + 65, 27)
        else:
            text(case.id, center, case.y + 20, 24, is_bold=True)
            text(case.lines[0], center, case.y + 49, 27)
            text(case.lines[1], center, case.y + 77, 26)

    for actor in ACTORS:
        x = actor.center_x
        draw.ellipse((px(x - 12), px(170), px(x + 12), px(194)),
                     fill="#FFFFFF", outline="#243047", width=px(3.4))
        for points in (
            [(x, 194), (x, 225)], [(x - 26, 207), (x + 26, 207)],
            [(x, 225), (x - 23, 247)], [(x, 225), (x + 23, 247)],
        ):
            line(points, "#243047", 3.5)
        text(actor.label, x, 273, 26, is_bold=True)

    text("Nota: UC06 e atualização de pedidos são demonstrativos/sandbox; "
         "consulta de treinadores não implica contratação efetiva.",
         WIDTH / 2, 1157, 24, "#475569")
    path = OUT / f"{NAME}.png"
    image.save(path, format="PNG", dpi=(400, 400), optimize=True)
    print(f"Saved {path} ({image.width} x {image.height} px)")


if __name__ == "__main__":
    ids = {case.id for case in CASES}
    assert ids == {f"UC{i:02}" for i in range(1, 18)}, "Use cases must be UC01–UC17"
    assert len(ACTORS) == 5 and len(GENERIC_CHILDREN) == 4
    for case in CASES:
        assert case.actor_id in ACTOR_BY_ID
        assert 240 < case.x < 2300 and 310 < case.y and case.y + OVAL_H < 1100
    OUT.mkdir(parents=True, exist_ok=True)
    make_drawio()
    make_svg()
    make_png()
