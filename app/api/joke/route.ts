import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?type=single&amount=1';

    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'LMGUAF-Joke-Generator/1.0',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Impossible de récupérer une blague depuis l’API externe.' },
        { status: 500 }
      );
    }

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { error: 'Aucune blague disponible pour le moment.' },
        { status: 500 }
      );
    }

    const joke = data.joke || `${data.setup} ${data.delivery}`;

    return NextResponse.json({ joke }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur interne du serveur lors de la récupération de la blague.' },
      { status: 500 }
    );
  }
}
