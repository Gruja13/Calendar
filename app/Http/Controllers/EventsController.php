<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    public function save(Request $request)
    {
        $title = $request->title;
        $description = $request->description;
        $date = $request->date;

        Event::create([
           'title' => $title,
           'description' => $description,
           'date' => $date
        ]);

        redirect('/');
    }

    public function show()
    {
        $events = Event::all();
        $data = [];

        foreach($events as $event){
            $row = [];
            $row['id'] = $event->id;
            $row['title'] = $event->title;
            $row['description'] = $event->description;
            $row['month'] = date('n', strtotime($event->date));
            $row['day'] = date('j', strtotime($event->date));

            array_push($data, $row);
        }

        return $data;
    }

    public function delete(Request $request)
    {
        Event::find($request->id)->delete();
    }

}
